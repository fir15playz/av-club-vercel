"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react"
import { getBrowserClient } from "@/lib/supabase"
import { useAuth } from "./auth-context"
import { debounce } from "@/lib/utils"

// Define types for blog posts and categories
export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string | null
  author_id: string
  category_id: number
  is_featured: boolean
  published_at: string
  created_at: string
  profiles?: {
    id: string
    first_name: string | null
    last_name: string | null
    avatar_url: string | null
  }
  categories?: {
    id: number
    name: string
    slug: string
  }
  edit_history?: Array<{
    id: number
    post_id: number
    editor_id: string
    edited_at: string
    change_description: string | null
    profiles?: {
      id: string
      first_name: string | null
      last_name: string | null
    }
  }>
}

export interface BlogCategory {
  id: number
  name: string
  slug: string
}

interface RealTimeBlogContextType {
  posts: BlogPost[]
  featuredPost: BlogPost | null
  categories: BlogCategory[]
  isLoading: boolean
  error: string | null
  fetchPosts: (category?: string) => Promise<void>
  getPostBySlug: (slug: string) => Promise<BlogPost | null>
  addPost: (post: Partial<BlogPost>) => Promise<boolean>
  updatePost: (id: number, updates: Partial<BlogPost>, changeDescription?: string) => Promise<boolean>
  deletePost: (id: number) => Promise<boolean>
}

const RealTimeBlogContext = createContext<RealTimeBlogContextType | undefined>(undefined)

export function RealTimeBlogProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { currentUser } = useAuth()

  // Use refs to store subscription objects for cleanup
  const subscriptionRef = useRef<any>(null)

  // Debounced fetch to prevent excessive database calls
  const debouncedFetch = useCallback(
    debounce((category?: string) => {
      fetchPosts(category)
    }, 300),
    [],
  )

  const fetchPosts = useCallback(async (category?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const supabase = getBrowserClient()

      // Fetch categories first
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*")
        .order("name")

      if (categoriesError) throw new Error(categoriesError.message)

      // Add "All" category
      const allCategories = [{ id: 0, name: "All", slug: "all" }, ...categoriesData]
      setCategories(allCategories)

      // Build query for posts
      let query = supabase.from("blog_posts").select(`
          *,
          categories(id, name, slug),
          profiles(id, first_name, last_name, avatar_url)
        `)

      // Filter by category if specified
      if (category && category !== "all") {
        // Join with categories to filter by slug
        query = query.eq("categories.slug", category)
      }

      // Execute query
      const { data, error: postsError } = await query.order("published_at", { ascending: false })

      if (postsError) throw new Error(postsError.message)

      // Find featured post
      const featured = data?.find((post) => post.is_featured) || null
      setFeaturedPost(featured)

      // Set all posts
      setPosts(data || [])
    } catch (err) {
      console.error("Error fetching posts:", err)
      setError(err instanceof Error ? err.message : "Failed to fetch posts")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getPostBySlug = useCallback(async (slug: string): Promise<BlogPost | null> => {
    try {
      const supabase = getBrowserClient()

      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          categories(id, name, slug),
          profiles(id, first_name, last_name, avatar_url),
          edit_history:blog_post_edits(
            id, post_id, editor_id, edited_at, change_description,
            profiles(id, first_name, last_name)
          )
        `)
        .eq("slug", slug)
        .single()

      if (error) {
        console.error("Error fetching post:", error)
        return null
      }

      return data
    } catch (err) {
      console.error("Error in getPostBySlug:", err)
      return null
    }
  }, [])

  const addPost = useCallback(
    async (post: Partial<BlogPost>): Promise<boolean> => {
      if (!currentUser) return false

      try {
        const supabase = getBrowserClient()

        const { data, error } = await supabase
          .from("blog_posts")
          .insert({
            title: post.title || "",
            excerpt: post.excerpt || "",
            content: post.content || "",
            category_id: post.category_id || 1,
            author_id: currentUser.id,
            image_url: post.image_url || null,
            is_featured: post.is_featured || false,
            published: true,
            published_at: new Date().toISOString(),
          })
          .select()

        if (error) {
          console.error("Error adding post:", error)
          return false
        }

        return true
      } catch (err) {
        console.error("Error in addPost:", err)
        return false
      }
    },
    [currentUser],
  )

  const updatePost = useCallback(
    async (id: number, updates: Partial<BlogPost>, changeDescription?: string): Promise<boolean> => {
      if (!currentUser) return false

      try {
        const supabase = getBrowserClient()

        // Start a transaction
        const { error: updateError } = await supabase
          .from("blog_posts")
          .update({
            title: updates.title,
            excerpt: updates.excerpt,
            content: updates.content,
            category_id: updates.category_id,
            image_url: updates.image_url,
            is_featured: updates.is_featured,
            updated_at: new Date().toISOString(),
          })
          .eq("id", id)

        if (updateError) {
          console.error("Error updating post:", updateError)
          return false
        }

        // Record the edit history
        const { error: historyError } = await supabase.from("blog_post_edits").insert({
          post_id: id,
          editor_id: currentUser.id,
          edited_at: new Date().toISOString(),
          change_description: changeDescription || null,
        })

        if (historyError) {
          console.error("Error recording edit history:", historyError)
          // We don't fail the whole operation if just the history fails
        }

        return true
      } catch (err) {
        console.error("Error in updatePost:", err)
        return false
      }
    },
    [currentUser],
  )

  const deletePost = useCallback(
    async (id: number): Promise<boolean> => {
      if (!currentUser) return false

      try {
        const supabase = getBrowserClient()

        // Check if user has permission (author or admin)
        const { data: post, error: fetchError } = await supabase
          .from("blog_posts")
          .select("author_id")
          .eq("id", id)
          .single()

        if (fetchError) {
          console.error("Error fetching post for deletion:", fetchError)
          return false
        }

        // Check permissions
        const isAuthor = post.author_id === currentUser.id
        const isAdmin = ["admin", "president", "co-president", "communications-director"].includes(currentUser.role)

        if (!isAuthor && !isAdmin) {
          console.error("User does not have permission to delete this post")
          return false
        }

        // Delete the post
        const { error: deleteError } = await supabase.from("blog_posts").delete().eq("id", id)

        if (deleteError) {
          console.error("Error deleting post:", deleteError)
          return false
        }

        return true
      } catch (err) {
        console.error("Error in deletePost:", err)
        return false
      }
    },
    [currentUser],
  )

  // Set up real-time subscription
  useEffect(() => {
    const supabase = getBrowserClient()

    // Clean up any existing subscription
    if (subscriptionRef.current) {
      supabase.removeChannel(subscriptionRef.current)
    }

    // Initial fetch
    fetchPosts()

    // Set up real-time subscription
    const channel = supabase
      .channel("blog-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blog_posts",
        },
        () => {
          // Refresh posts when changes occur
          debouncedFetch()
        },
      )
      .subscribe()

    // Store subscription for cleanup
    subscriptionRef.current = channel

    // Cleanup function
    return () => {
      supabase.removeChannel(channel)
    }
  }, [fetchPosts, debouncedFetch])

  const value = {
    posts,
    featuredPost,
    categories,
    isLoading,
    error,
    fetchPosts,
    getPostBySlug,
    addPost,
    updatePost,
    deletePost,
  }

  return <RealTimeBlogContext.Provider value={value}>{children}</RealTimeBlogContext.Provider>
}

export function useRealTimeBlog() {
  const context = useContext(RealTimeBlogContext)
  if (context === undefined) {
    throw new Error("useRealTimeBlog must be used within a RealTimeBlogProvider")
  }
  return context
}
