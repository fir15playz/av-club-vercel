import { NextResponse } from "next/server"
import { getServerClient } from "@/lib/supabase"

export async function POST() {
  try {
    const supabase = getServerClient()

    // Clear existing data first (in reverse order of dependencies)
    await supabase.from("blog_post_edits").delete().neq("id", 0)
    await supabase.from("blog_posts").delete().neq("id", 0)
    await supabase.from("categories").delete().neq("id", 0)

    // Seed categories
    const { error: categoriesError } = await supabase.from("categories").insert([
      { name: "Aviation News", slug: "aviation-news" },
      { name: "Flight Training", slug: "flight-training" },
      { name: "Aircraft Spotlight", slug: "aircraft-spotlight" },
      { name: "Club Events", slug: "club-events" },
      { name: "Technology", slug: "technology" },
    ])

    if (categoriesError) {
      throw new Error(`Error seeding categories: ${categoriesError.message}`)
    }

    // Get admin user for authoring posts
    const { data: adminUser, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("role", "admin")
      .single()

    let authorId: string

    if (userError) {
      // If no admin, get any user
      const { data: anyUser, error: anyUserError } = await supabase.from("profiles").select("id").limit(1).single()

      if (anyUserError) {
        throw new Error("No users found to author seed posts")
      }

      // Use the first user we found
      authorId = anyUser.id
    } else {
      authorId = adminUser.id
    }

    // Get category IDs
    const { data: categories, error: fetchCategoriesError } = await supabase.from("categories").select("id, name")

    if (fetchCategoriesError || !categories) {
      throw new Error(`Error fetching categories: ${fetchCategoriesError?.message || "No categories found"}`)
    }

    // Create a map of category names to IDs
    const categoryMap = categories.reduce(
      (map, category) => {
        map[category.name] = category.id
        return map
      },
      {} as Record<string, number>,
    )

    // Seed posts
    const { error: postsError } = await supabase.from("blog_posts").insert([
      {
        title: "The Future of Aviation: Electric Aircraft",
        slug: "future-of-aviation-electric-aircraft",
        excerpt:
          "Exploring how electric propulsion is revolutionizing the aviation industry with cleaner, quieter flight.",
        content: `
          <h2>The Electric Revolution in Aviation</h2>
          <p>The aviation industry is on the cusp of a major transformation with the development of electric aircraft. These innovative planes promise to reduce emissions, noise pollution, and potentially the cost of flying.</p>
          
          <h3>Benefits of Electric Aircraft</h3>
          <ul>
            <li>Zero direct emissions during flight</li>
            <li>Significantly reduced noise levels</li>
            <li>Lower operating costs</li>
            <li>Simplified maintenance with fewer moving parts</li>
          </ul>
          
          <p>Major manufacturers and startups alike are investing billions in developing viable electric aircraft. While current battery technology limits range, hybrid-electric solutions are bridging the gap until battery energy density improves.</p>
          
          <h3>Timeline for Adoption</h3>
          <p>Small electric aircraft for training and short regional flights are already entering service. Larger commercial electric planes are expected to become viable for short-haul routes within the next decade.</p>
          
          <p>The transition to electric aviation represents one of the most promising paths to sustainable air travel in a world increasingly concerned about climate change.</p>
        `,
        author_id: authorId,
        category_id: categoryMap["Technology"],
        image_url: "/images/placeholder.png",
        is_featured: true,
        published_at: new Date().toISOString(),
      },
      {
        title: "Getting Started with Flight Simulation",
        slug: "getting-started-with-flight-simulation",
        excerpt: "A beginner's guide to flight simulation software and hardware for aspiring pilots.",
        content: `
          <h2>Taking Your First Virtual Flight</h2>
          <p>Flight simulation has evolved from simple games to sophisticated training tools used by professional pilots. For aviation enthusiasts, flight sims offer an accessible way to experience the joy of flight and learn the basics of aircraft operation.</p>
          
          <h3>Choosing Your Simulator</h3>
          <p>Several excellent flight simulators are available today:</p>
          <ul>
            <li><strong>Microsoft Flight Simulator</strong> - The latest version offers stunning visuals and global scenery</li>
            <li><strong>X-Plane</strong> - Known for its realistic flight models and physics</li>
            <li><strong>Prepar3D</strong> - Built on the FSX platform with enhanced capabilities</li>
            <li><strong>DCS World</strong> - Focused on military aircraft with detailed systems modeling</li>
          </ul>
          
          <h3>Essential Hardware</h3>
          <p>While you can fly with a keyboard and mouse, dedicated hardware greatly enhances the experience:</p>
          <ul>
            <li>A joystick or yoke for primary flight controls</li>
            <li>Throttle quadrant for power management</li>
            <li>Rudder pedals for directional control</li>
          </ul>
          
          <p>Start simple and expand your setup as your interest grows. Many pilots begin with an affordable joystick before investing in more advanced equipment.</p>
          
          <h3>Learning Resources</h3>
          <p>Take advantage of the wealth of tutorials available online. Many virtual flying clubs offer mentorship programs where experienced simmers can guide beginners through their first flights.</p>
          
          <p>Flight simulation is not just a hobby—it's a valuable tool for anyone interested in aviation, whether you plan to become a pilot or simply want to understand more about how aircraft fly.</p>
        `,
        author_id: authorId,
        category_id: categoryMap["Flight Training"],
        image_url: "/images/placeholder.png",
        published_at: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      },
      {
        title: "Upcoming Aviation Club Field Trip to Local Airport",
        slug: "upcoming-field-trip-local-airport",
        excerpt: "Join us for a behind-the-scenes tour of airport operations and aircraft maintenance facilities.",
        content: `
          <h2>Mark Your Calendars!</h2>
          <p>We're excited to announce that the Aviation Club has arranged a special field trip to our local airport next month. This is an excellent opportunity to see airport operations up close and learn directly from aviation professionals.</p>
          
          <h3>What to Expect</h3>
          <p>Our visit will include:</p>
          <ul>
            <li>Tour of the air traffic control tower</li>
            <li>Behind-the-scenes look at baggage handling systems</li>
            <li>Visit to an aircraft maintenance hangar</li>
            <li>Q&A session with pilots and ground crew</li>
          </ul>
          
          <h3>Important Details</h3>
          <p><strong>Date:</strong> Saturday, June 15th<br>
          <strong>Time:</strong> 9:00 AM - 2:00 PM<br>
          <strong>Meeting Point:</strong> School parking lot for group transportation<br>
          <strong>What to Bring:</strong> Photo ID, lunch or lunch money, notebook, weather-appropriate clothing</p>
          
          <h3>How to Sign Up</h3>
          <p>Space is limited to 20 students, so early registration is recommended. Please submit the permission form to Mr. Johnson by June 1st to secure your spot.</p>
          
          <p>This field trip is a highlight of our club activities each year and provides valuable insights into aviation careers and operations. Don't miss this opportunity!</p>
        `,
        author_id: authorId,
        category_id: categoryMap["Club Events"],
        image_url: "/images/placeholder.png",
        published_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      },
    ])

    if (postsError) {
      throw new Error(`Error seeding posts: ${postsError.message}`)
    }

    return NextResponse.json({
      success: true,
      message: "Database seeded successfully with categories and posts",
    })
  } catch (error) {
    console.error("Seed error:", error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An unknown error occurred",
      },
      { status: 500 },
    )
  }
}
