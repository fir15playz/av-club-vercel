export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          role: string
          join_date: string
          avatar_url: string | null
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          role?: string
          join_date?: string
          avatar_url?: string | null
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          role?: string
          join_date?: string
          avatar_url?: string | null
        }
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string
          content: string
          published_at: string
          updated_at: string
          author_id: string
          category_id: number
          image_url: string | null
          is_featured: boolean
          view_count: number
        }
        Insert: {
          id?: number
          title: string
          slug: string
          excerpt: string
          content: string
          published_at?: string
          updated_at?: string
          author_id: string
          category_id: number
          image_url?: string | null
          is_featured?: boolean
          view_count?: number
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          published_at?: string
          updated_at?: string
          author_id?: string
          category_id?: number
          image_url?: string | null
          is_featured?: boolean
          view_count?: number
        }
      }
      comments: {
        Row: {
          id: number
          content: string
          created_at: string
          updated_at: string
          author_id: string
          post_id: number
        }
        Insert: {
          id?: number
          content: string
          created_at?: string
          updated_at?: string
          author_id: string
          post_id: number
        }
        Update: {
          id?: number
          content?: string
          created_at?: string
          updated_at?: string
          author_id?: string
          post_id?: number
        }
      }
      edit_history: {
        Row: {
          id: number
          post_id: number
          editor_id: string
          edited_at: string
          change_description: string | null
        }
        Insert: {
          id?: number
          post_id: number
          editor_id: string
          edited_at?: string
          change_description?: string | null
        }
        Update: {
          id?: number
          post_id?: number
          editor_id?: string
          edited_at?: string
          change_description?: string | null
        }
      }
      likes: {
        Row: {
          id: number
          post_id: number
          user_id: string
          created_at: string
        }
        Insert: {
          id?: number
          post_id: number
          user_id: string
          created_at?: string
        }
        Update: {
          id?: number
          post_id?: number
          user_id?: string
          created_at?: string
        }
      }
      bookmarks: {
        Row: {
          id: number
          post_id: number
          user_id: string
          created_at: string
        }
        Insert: {
          id?: number
          post_id: number
          user_id: string
          created_at?: string
        }
        Update: {
          id?: number
          post_id?: number
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}
