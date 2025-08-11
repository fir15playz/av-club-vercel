import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname from the URL
  const { pathname } = request.nextUrl

  // Add security headers to all responses
  const response = NextResponse.next()

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Add Content Security Policy for Vercel deployment
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' *.vercel.app; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: *.vercel.app; font-src 'self'; connect-src 'self' *.supabase.co *.vercel.app;",
  )

  return response
}

// Only run middleware on specific paths
export const config = {
  matcher: [
    // Apply to all routes except for static files, api routes, and _next
    "/((?!_next/static|_next/image|favicon.ico|images/|api/).*)",
  ],
}
