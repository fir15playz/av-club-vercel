"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useAuth, UserRole } from "./auth-context"

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  author: {
    id: string
    name: string
  }
  category: string
  image: string
  editHistory?: {
    date: string
    editorId: string
    editorName: string
  }[]
}

interface BlogContextType {
  posts: BlogPost[]
  featuredPost: BlogPost | null
  categories: string[]
  addPost: (post: Omit<BlogPost, "id" | "date" | "author" | "editHistory">) => Promise<boolean>
  editPost: (id: number, updates: Partial<Omit<BlogPost, "id" | "author" | "editHistory">>) => Promise<boolean>
  deletePost: (id: number) => Promise<boolean>
  getPostById: (id: number) => BlogPost | null
  getPostsByCategory: (category: string) => BlogPost[]
}

// Initial blog posts (same as in the original code)
const initialPosts: BlogPost[] = [
  {
    id: 1,
    title: "Getting Started with Flight Simulation",
    excerpt: "Learn about the best flight simulators for beginners and how to set up your first home cockpit.",
    content: `
      <p>Flight simulation is an excellent way to experience the thrill of flying without leaving the ground. Whether you're an aspiring pilot looking to practice procedures or an aviation enthusiast who wants to experience what it's like to fly different aircraft, flight simulators offer an accessible entry point into the world of aviation.</p>
      
      <h2>Choosing Your First Flight Simulator</h2>
      
      <p>There are several flight simulators available, each with different strengths:</p>
      
      <ul>
        <li><strong>Microsoft Flight Simulator (2020)</strong>: The newest entry in the long-running series offers stunning visuals and a complete recreation of Earth using satellite imagery and cloud-based data.</li>
        <li><strong>X-Plane 12</strong>: Known for its realistic flight models and physics, X-Plane is popular among those seeking accuracy in aircraft behavior.</li>
        <li><strong>Prepar3D</strong>: Developed by Lockheed Martin, this simulator is focused on training and education.</li>
        <li><strong>DCS World</strong>: For those interested in military aviation, DCS offers highly detailed combat aircraft simulations.</li>
      </ul>
      
      <p>For beginners, Microsoft Flight Simulator 2020 offers the best balance of accessibility and realism. Its tutorials guide you through the basics of flight, and the visual fidelity helps maintain interest as you learn.</p>
      
      <h2>Essential Equipment</h2>
      
      <p>While you can fly with just a keyboard and mouse, having the right equipment greatly enhances the experience:</p>
      
      <ul>
        <li><strong>Joystick or Yoke</strong>: A basic flight stick like the Logitech Extreme 3D Pro is an affordable starting point. As you advance, you might consider a yoke system for civilian aircraft or a HOTAS (Hands On Throttle And Stick) for military aircraft.</li>
        <li><strong>Throttle Control</strong>: Many joysticks include a small throttle, but a dedicated throttle gives you finer control.</li>
        <li><strong>Rudder Pedals</strong>: These control the yaw of the aircraft and are essential for realistic taxiing and crosswind landings.</li>
      </ul>
      
      <h2>Setting Up Your Home Cockpit</h2>
      
      <p>Start small and expand as your interest grows:</p>
      
      <ol>
        <li>Find a comfortable, stable surface for your controls</li>
        <li>Position your monitor at eye level</li>
        <li>Consider a larger monitor or multiple monitors for a wider field of view</li>
        <li>Ensure your chair provides good back support for longer sessions</li>
      </ol>
      
      <p>As you become more invested, you might add button boxes, switch panels, or even build a cockpit frame.</p>
      
      <h2>Learning to Fly</h2>
      
      <p>Take advantage of these resources to improve your skills:</p>
      
      <ul>
        <li>Complete the in-game tutorials</li>
        <li>Watch YouTube tutorials specific to your simulator and aircraft</li>
        <li>Join online communities like VATSIM or IVAO for multiplayer flying with air traffic control</li>
        <li>Consider flight training books like "Microsoft Flight Simulator X For Pilots" or "X-Plane 11 Pilot Training"</li>
      </ul>
      
      <p>Remember that patience is key. Start with simple aircraft like the Cessna 152 or 172, master the basics of straight and level flight, then gradually progress to more complex aircraft and procedures.</p>
      
      <h2>Join Our Flight Sim Sessions</h2>
      
      <p>The Aviation Club hosts weekly flight simulation sessions where members can learn from each other, participate in group flights, and share tips and tricks. Check our Discord for the schedule and join us in the virtual skies!</p>
    `,
    date: "April 1, 2025",
    author: {
      id: "1",
      name: "Pranav A",
    },
    category: "Simulation",
    image: "/images/placeholder.png",
  },
  {
    id: 2,
    title: "Understanding Aviation Weather Reports",
    excerpt: "A comprehensive guide to reading and interpreting METAR and TAF reports for safer flying.",
    content: `
      <p>Weather is one of the most critical factors in aviation safety. Pilots must understand how to interpret weather information to make informed decisions about their flights. In this guide, we'll break down the basics of METAR and TAF reports, the standard formats for reporting weather conditions at airports worldwide.</p>
      
      <h2>METAR: Current Weather Observations</h2>
      
      <p>METAR (Meteorological Aerodrome Report) provides current weather conditions at an airport. Let's decode a sample METAR:</p>
      
      <pre>KJFK 011253Z 28015G25KT 3/4SM R04R/4000FT -RA BR BKN008 OVC012 06/04 A2990 RMK AO2</pre>
      
      <ul>
        <li><strong>KJFK</strong>: The ICAO code for John F. Kennedy International Airport</li>
        <li><strong>011253Z</strong>: Date and time (1st day of the month at 12:53 UTC)</li>
        <li><strong>28015G25KT</strong>: Wind direction and speed (280° at 15 knots, gusting to 25 knots)</li>
        <li><strong>3/4SM</strong>: Visibility (3/4 statute mile)</li>
        <li><strong>R04R/4000FT</strong>: Runway visual range (Runway 4R has a visual range of 4000 feet)</li>
        <li><strong>-RA BR</strong>: Weather phenomena (light rain and mist)</li>
        <li><strong>BKN008 OVC012</strong>: Cloud coverage (broken at 800 feet, overcast at 1200 feet)</li>
        <li><strong>06/04</strong>: Temperature and dew point (6°C and 4°C)</li>
        <li><strong>A2990</strong>: Altimeter setting (29.90 inches of mercury)</li>
        <li><strong>RMK AO2</strong>: Remarks section (automated station with precipitation sensor)</li>
      </ul>
      
      <h2>TAF: Weather Forecasts</h2>
      
      <p>TAF (Terminal Aerodrome Forecast) provides a forecast of weather conditions at an airport. Here's a sample TAF:</p>
      
      <pre>KJFK 011130Z 0112/0212 28012KT 5SM -RA BR BKN015 
    FM011700 30010KT 6SM -RA SCT020 BKN040
    FM012300 32008KT P6SM SCT040
    FM020600 34006KT P6SM SKC</pre>
      
      <ul>
        <li><strong>KJFK 011130Z</strong>: Airport code and time the forecast was issued</li>
        <li><strong>0112/0212</strong>: Valid period (from the 1st at 12:00 UTC to the 2nd at 12:00 UTC)</li>
        <li><strong>28012KT 5SM -RA BR BKN015</strong>: Initial conditions (wind 280° at 12 knots, 5 statute miles visibility, light rain, mist, broken clouds at 1500 feet)</li>
        <li><strong>FM011700</strong>: From 17:00 UTC on the 1st, conditions will change to...</li>
        <li><strong>30010KT 6SM -RA SCT020 BKN040</strong>: Wind 300° at 10 knots, 6 statute miles visibility, light rain, scattered clouds at 2000 feet, broken clouds at 4000 feet</li>
        <li><strong>FM012300</strong>: From 23:00 UTC on the 1st...</li>
        <li><strong>32008KT P6SM SCT040</strong>: Wind 320° at 8 knots, visibility more than 6 statute miles, scattered clouds at 4000 feet</li>
        <li><strong>FM020600</strong>: From 06:00 UTC on the 2nd...</li>
        <li><strong>34006KT P6SM SKC</strong>: Wind 340° at 6 knots, visibility more than 6 statute miles, sky clear</li>
      </ul>
      
      <h2>Weather Codes and Abbreviations</h2>
      
      <p>Common weather phenomena abbreviations:</p>
      
      <ul>
        <li><strong>RA</strong>: Rain</li>
        <li><strong>SN</strong>: Snow</li>
        <li><strong>FG</strong>: Fog</li>
        <li><strong>BR</strong>: Mist</li>
        <li><strong>HZ</strong>: Haze</li>
        <li><strong>TS</strong>: Thunderstorm</li>
        <li><strong>SH</strong>: Shower</li>
      </ul>
      
      <p>Intensity indicators:</p>
      
      <ul>
        <li><strong>-</strong>: Light</li>
        <li>No symbol: Moderate</li>
        <li><strong>+</strong>: Heavy</li>
      </ul>
      
      <p>Cloud coverage:</p>
      
      <ul>
        <li><strong>SKC/CLR</strong>: Sky clear</li>
        <li><strong>FEW</strong>: Few (1/8 to 2/8 coverage)</li>
        <li><strong>SCT</strong>: Scattered (3/8 to 4/8 coverage)</li>
        <li><strong>BKN</strong>: Broken (5/8 to 7/8 coverage)</li>
        <li><strong>OVC</strong>: Overcast (8/8 coverage)</li>
      </ul>
      
      <h2>Weather Resources for Pilots</h2>
      
      <p>Several resources provide aviation weather information:</p>
      
      <ul>
        <li><a href="https://www.aviationweather.gov/">Aviation Weather Center</a></li>
        <li><a href="https://www.skyvector.com/">SkyVector</a></li>
        <li><a href="https://www.windy.com/">Windy</a></li>
        <li>ForeFlight, Garmin Pilot, and other aviation apps</li>
      </ul>
      
      <h2>Practice Makes Perfect</h2>
      
      <p>Understanding weather reports takes practice. Try these exercises:</p>
      
      <ol>
        <li>Look up the current METAR for your local airport and decode it</li>
        <li>Compare the TAF to the actual weather that occurred</li>
        <li>Practice making go/no-go decisions based on weather reports</li>
      </ol>
      
      <p>Join our monthly weather workshops where we analyze real-world weather scenarios and discuss their implications for flight planning and safety.</p>
    `,
    date: "March 25, 2025",
    author: {
      id: "2",
      name: "Kevin M",
    },
    category: "Education",
    image: "/images/placeholder.png",
  },
  {
    id: 3,
    title: "The History of Aviation: From Wright Brothers to Modern Jets",
    excerpt: "Explore the fascinating evolution of aircraft from the first flight to today's advanced airliners.",
    content: "",
    date: "March 15, 2025",
    author: {
      id: "5",
      name: "Taylor Kim",
    },
    category: "History",
    image: "/images/placeholder.png",
  },
  {
    id: 4,
    title: "Career Paths in Aviation",
    excerpt: "Discover various career opportunities in the aviation industry beyond being a pilot.",
    content: "",
    date: "March 5, 2025",
    author: {
      id: "3",
      name: "Alex Johnson",
    },
    category: "Careers",
    image: "/images/placeholder.png",
  },
  {
    id: 5,
    title: "Aviation Photography Tips and Tricks",
    excerpt: "Learn how to capture stunning photos of aircraft with any camera equipment.",
    content: "",
    date: "February 20, 2025",
    author: {
      id: "7",
      name: "Guest User",
    },
    category: "Photography",
    image: "/images/placeholder.png",
  },
  {
    id: 6,
    title: "Club Field Trip: Visit to Air Traffic Control Tower",
    excerpt: "Recap of our recent visit to the local ATC tower and what we learned about air traffic management.",
    content: "",
    date: "February 10, 2025",
    author: {
      id: "4",
      name: "Sam Rodriguez",
    },
    category: "Events",
    image: "/images/placeholder.png",
  },
]

const categories = ["All", "Simulation", "Education", "History", "Careers", "Photography", "Events"]

const BlogContext = createContext<BlogContextType | undefined>(undefined)

export const BlogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)

  // Initialize posts from localStorage or use initial data
  useEffect(() => {
    const savedPosts = localStorage.getItem("blogPosts")
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts))
      } catch (error) {
        console.error("Failed to parse saved posts:", error)
        setPosts(initialPosts)
      }
    } else {
      setPosts(initialPosts)
    }
  }, [])

  // Update featured post when posts change
  useEffect(() => {
    if (posts.length > 0) {
      setFeaturedPost(posts[0])
    } else {
      setFeaturedPost(null)
    }
  }, [posts])

  // Save posts to localStorage when they change
  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts))
  }, [posts])

  const addPost = async (post: Omit<BlogPost, "id" | "date" | "author" | "editHistory">): Promise<boolean> => {
    if (!currentUser) return false

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newPost: BlogPost = {
      id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: {
        id: currentUser.id,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
      },
      category: post.category,
      image: post.image || "/images/placeholder.png",
      editHistory: [],
    }

    setPosts((prev) => [newPost, ...prev])
    return true
  }

  const editPost = async (
    id: number,
    updates: Partial<Omit<BlogPost, "id" | "author" | "editHistory">>,
  ): Promise<boolean> => {
    if (!currentUser) return false

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const postIndex = posts.findIndex((p) => p.id === id)
    if (postIndex === -1) return false

    const post = posts[postIndex]

    // Check permissions: only the author, Communications Director, Co-President, or President can edit
    const canEdit = post.author.id === currentUser.id || currentUser.role >= UserRole.CommunicationsDirector

    if (!canEdit) return false

    // Create edit history entry
    const editEntry = {
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      editorId: currentUser.id,
      editorName: `${currentUser.firstName} ${currentUser.lastName}`,
    }

    const updatedPost = {
      ...post,
      ...updates,
      editHistory: [...(post.editHistory || []), editEntry],
    }

    setPosts((prev) => prev.map((p) => (p.id === id ? updatedPost : p)))
    return true
  }

  const deletePost = async (id: number): Promise<boolean> => {
    if (!currentUser) return false

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const post = posts.find((p) => p.id === id)
    if (!post) return false

    // Check permissions: only the author, Communications Director, Co-President, or President can delete
    const canDelete = post.author.id === currentUser.id || currentUser.role >= UserRole.CommunicationsDirector

    if (!canDelete) return false

    setPosts((prev) => prev.filter((p) => p.id !== id))
    return true
  }

  const getPostById = (id: number): BlogPost | null => {
    return posts.find((p) => p.id === id) || null
  }

  const getPostsByCategory = (category: string): BlogPost[] => {
    if (category === "All") return posts
    return posts.filter((p) => p.category === category)
  }

  return (
    <BlogContext.Provider
      value={{
        posts,
        featuredPost,
        categories,
        addPost,
        editPost,
        deletePost,
        getPostById,
        getPostsByCategory,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}

export const useBlog = () => {
  const context = useContext(BlogContext)
  if (context === undefined) {
    throw new Error("useBlog must be used within a BlogProvider")
  }
  return context
}
