import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// This is safe to expose as it's using the anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// For server-side operations that need elevated privileges
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Singleton pattern for browser client to prevent multiple instances
let browserClient: ReturnType<typeof createClient<Database>> | null = null

// Create a Supabase client for browser operations
export const getBrowserClient = () => {
  if (browserClient) return browserClient

  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: "aviation-club-auth",
    },
  })

  return browserClient
}

// Create a Supabase client for server operations with admin privileges
export const getServerClient = () => {
  return createClient<Database>(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
    },
    global: {
      fetch: (...args) => {
        const [url, options] = args
        return fetch(url as string, {
          ...(options as RequestInit),
          cache: "no-store",
        })
      },
    },
  })
}

// Add the createServerClient export as an alias for getServerClient
export const createServerClient = getServerClient
