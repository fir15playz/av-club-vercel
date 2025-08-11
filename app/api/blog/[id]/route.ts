import { type NextRequest, NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const id = params.id

  // Check if id is a number (post id) or a string (slug)
  const isNumeric = /^\d+$/.test(id)

  let query = supabase.from("blog_posts").select(`
      *,
      categories(name, slug),
      profiles(id, first_name, last_name, avatar_url),
      comments(
        id, 
        content, 
        created_at, 
        profiles(id, first_name, last_name, avatar_url)
      ),
      edit_history(
        id,
        editor_id,
        edited_at,
        change_description,
        profiles(id, first_name, last_name)
      )
    `)

  if (isNumeric) {
    query = query.eq("id", Number.parseInt(id))
  } else {
    query = query.eq("slug", id)
  }

  const { data, error } = await query.single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 })
  }

  // Increment view count
  await supabase
    .from("blog_posts")
    .update({ view_count: (data.view_count || 0) + 1 })
    .eq("id", data.id)

  return NextResponse.json({ post: data })
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const id = Number.parseInt(params.id)
  const body = await request.json()

  // Get the user from the session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  // Check if user has permission to edit this post
  const { data: post, error: postError } = await supabase.from("blog_posts").select("author_id").eq("id", id).single()

  if (postError) {
    return NextResponse.json({ error: postError.message }, { status: 404 })
  }

  // Check if user is the author or has admin role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single()

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  const isAuthor = post.author_id === userId
  const isAdmin = ["admin", "president", "co-president", "communications-director"].includes(profile.role)

  if (!isAuthor && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  // Update the post
  const updateData: any = {
    title: body.title,
    excerpt: body.excerpt,
    content: body.content,
    category_id: body.categoryId,
    updated_at: new Date().toISOString(),
  }

  if (body.imageUrl) {
    updateData.image_url = body.imageUrl
  }

  if (body.isFeatured !== undefined) {
    updateData.is_featured = body.isFeatured
  }

  const { data, error } = await supabase.from("blog_posts").update(updateData).eq("id", id).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Add to edit history
  await supabase.from("edit_history").insert({
    post_id: id,
    editor_id: userId,
    change_description: body.changeDescription || "Updated post",
  })

  return NextResponse.json({ post: data[0] })
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createServerClient()
  const id = Number.parseInt(params.id)

  // Get the user from the session
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.id

  // Check if user has permission to delete this post
  const { data: post, error: postError } = await supabase.from("blog_posts").select("author_id").eq("id", id).single()

  if (postError) {
    return NextResponse.json({ error: postError.message }, { status: 404 })
  }

  // Check if user is the author or has admin role
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single()

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 })
  }

  const isAuthor = post.author_id === userId
  const isAdmin = ["admin", "president", "co-president", "communications-director"].includes(profile.role)

  if (!isAuthor && !isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  // Delete the post
  const { error } = await supabase.from("blog_posts").delete().eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
