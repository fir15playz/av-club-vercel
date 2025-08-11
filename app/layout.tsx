import type React from "react"
import type { Metadata } from "next/dist/lib/metadata/types/metadata-interface"
import { Inter, Space_Grotesk } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ThemeProvider from "@/components/theme-provider"
import ThemeSwitcher from "@/components/theme-switcher"
import { AuthProvider } from "@/contexts/auth-context"
import { RealTimeBlogProvider } from "@/contexts/real-time-blog-context"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-space-grotesk",
})

export const metadata: Metadata = {
  title: "Aviation Club | LNHS",
  description: "Join our aviation community and explore the skies together",
  icons: {
    icon: "/images/Favicon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <RealTimeBlogProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <ThemeSwitcher />
            </RealTimeBlogProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
