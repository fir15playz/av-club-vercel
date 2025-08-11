import Link from "next/link"
import Image from "next/image"
import { Github, Twitter, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/images/logo_small.png"
                alt="SkyBound Aviation Club"
                width={50}
                height={50}
                className="h-10 w-auto mr-3"
              />
              <span className="font-bold text-xl">SkyBound</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Bringing aviation enthusiasts together to explore the skies and share their passion for flight.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-slate-500 hover:text-sky-500 transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-sky-500 transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-sky-500 transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="#" className="text-slate-500 hover:text-sky-500 transition-colors">
                <Github size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/#features"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#discord"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/#team"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/#join"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  Join Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  Flight Simulation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  Aviation Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  Event Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-slate-600 dark:text-slate-400">
                <strong>Email:</strong> info@skyboundaviation.com
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                <strong>Discord:</strong> SkyBound Aviation
              </li>
              <li className="text-slate-600 dark:text-slate-400">
                <strong>Location:</strong> Virtual & In-Person Meetings
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} SkyBound Aviation Club. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="#"
              className="text-slate-500 dark:text-slate-400 text-sm hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-slate-500 dark:text-slate-400 text-sm hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-slate-500 dark:text-slate-400 text-sm hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
            >
              License
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
