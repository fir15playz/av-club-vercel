"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMenuOpen(false)

    // If it's a hash link on the current page
    if (href.startsWith("/#") && window.location.pathname === "/") {
      const targetId = href.substring(2)
      const element = document.getElementById(targetId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      // Navigate to the page
      window.location.href = href
    }
  }

  return (
    <header className={`fixed w-full z-50 glass transition-all duration-300 ${isScrolled ? "py-2" : "py-3"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo_small.png"
                alt="SkyBound Aviation Club"
                width={40}
                height={40}
                className="h-8 w-auto mr-3"
              />
              <span className="font-bold text-lg hidden sm:block">Aviation Club | LNHS</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/#features"
              onClick={(e) => handleNavigation(e, "/#features")}
              className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              Features
            </a>
            <a
              href="/#discord"
              onClick={(e) => handleNavigation(e, "/#discord")}
              className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              Community
            </a>
            <Link
              href="/team"
              className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              Team
            </Link>
            <Link
              href="/blog"
              className="text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              Blog
            </Link>
            
            <Link
              href="/join"
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Join Us
            </Link>
          </nav>

          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 glass transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="/#features"
            onClick={(e) => handleNavigation(e, "/#features")}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Features
          </a>
          <a
            href="/#discord"
            onClick={(e) => handleNavigation(e, "/#discord")}
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Community
          </a>
          <Link
            href="/team"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Team
          </Link>
          <Link
            href="/blog"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/seed-database"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Seed DB
          </Link>
          <Link
            href="/join"
            className="block px-3 py-2 rounded-md text-base font-medium bg-sky-500 text-white hover:bg-sky-600 transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Join Us
          </Link>
        </div>
      </div>
    </header>
  )
}
