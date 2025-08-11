"use client"

import { useState } from "react"
import Link from "next/link"
import Toast from "@/components/toast"

export default function SeedDatabasePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const seedDatabase = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/seed", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Add cache control to prevent caching
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Seed Database</h1>
        <p className="mb-6 text-slate-600 dark:text-slate-400 text-center">
          This will populate your database with sample blog posts, categories, and other related data.
        </p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={seedDatabase}
            disabled={isLoading}
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Seeding Database...
              </>
            ) : (
              "Seed Database"
            )}
          </button>

          <Link
            href="/blog"
            className="bg-white dark:bg-slate-800 text-sky-500 dark:text-sky-400 border border-sky-500 dark:border-sky-400 font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-center"
          >
            Go to Blog
          </Link>
        </div>

        {result && <Toast message={result.message} type={result.success ? "success" : "error"} />}
      </div>
    </div>
  )
}
