import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"
import { slugify } from "@/lib/utils"

export async function GET(request: NextRequest) {
  const supabase = createServerClient()
  const { searchParams } = new URL(request.url)

  const category = searchParams.get("category")
  const featured = searchParams.get("featured")
  const limit = Number.parseInt(searchParams.get("limit") || "10")

  let query = supabase
    .from("blog_posts")
    .select(`
      *,
      categories(name, slug),
      profiles(id, first_name, last_name, avatar_url)
    `)
    .order("published_at", { ascending: false })

  if (category && category !== "All") {
    query = query.eq("categories.slug", category)
  }

  if (featured === "true") {
    query = query.eq("is_featured", true)
  }

  const { data, error } = await query.limit(limit)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ posts: data })
}

export async function POST(request: NextRequest) {
  const supabase = createServerClient()
  const body = await request.json()

  // Get the user from the session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  // Create a slug from the title
  const slug = slugify(body.title)

  // Insert the post
  const { data, error } = await supabase
    .from("blog_posts")
    .insert({
      title: body.title,
      slug,
      excerpt: body.excerpt,
      content: body.content,
      author_id: userId,
      category_id: body.categoryId,
      image_url: body.imageUrl || null,
      is_featured: body.isFeatured || false,
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ post: data[0] })
}
