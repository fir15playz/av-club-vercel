"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { RealTimeBlogProvider, useRealTimeBlog } from "@/contexts/real-time-blog-context"
import RealTimePostEditor from "@/components/blog/real-time-post-editor"
// Add import for the new component
import ResponsiveBlogCard from "@/components/blog/responsive-blog-card"
// Add import for the loading component
import BlogLoading from "@/components/blog/blog-loading"

function RealTimeBlogContent() {
  const { currentUser } = useAuth()
  const { posts, featuredPost, categories, isLoading, fetchPosts, deletePost } = useRealTimeBlog()

  const [activeCategory, setActiveCategory] = useState("All")
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<any | null>(null)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    fetchPosts(category)
  }

  const handleEditPost = (post: any) => {
    setEditingPost(post)
    setIsPostEditorOpen(true)
  }

  const handleDeletePost = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      setIsDeleting(id)
      try {
        await deletePost(id)
      } finally {
        setIsDeleting(null)
      }
    }
  }

  const canCreatePost = !!currentUser

  if (isLoading) {
    return <BlogLoading />
  }

  return (
    <div className="pt-20 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-16 bg-gradient-to-r from-sky-500 to-indigo-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 py-16 md:py-24 px-6 md:px-12 text-white">
            <div className="flex justify-between items-start">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">SkyBound Aviation Blog</h1>
                <p className="text-xl text-sky-100 mb-8">
                  Real-time insights, stories, and knowledge from our aviation community
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeCategory === category.slug
                      ? "bg-white text-sky-600"
                      : "bg-white/20 text-white hover:bg-white/30 transition-colors"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Controls */}
        {currentUser && (
          <div className="mb-8 flex justify-end space-x-4">
            {canCreatePost && (
              <button
                onClick={() => {
                  setEditingPost(null)
                  setIsPostEditorOpen(true)
                }}
                className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Create New Post
              </button>
            )}
          </div>
        )}

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <span className="w-8 h-1 bg-sky-500 rounded-full mr-3"></span>
              Featured Post
            </h2>

            <ResponsiveBlogCard post={featuredPost} isFeature={true} />
          </div>
        )}

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <span className="w-8 h-1 bg-sky-500 rounded-full mr-3"></span>
            {activeCategory === "all"
              ? "Latest Articles"
              : `${categories.find((c) => c.slug === activeCategory)?.name || ""} Articles`}
          </h2>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 text-lg">No articles found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts
                .filter((p) => p.id !== featuredPost?.id)
                .map((post) => (
                  <ResponsiveBlogCard key={post.id} post={post} />
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Editor Modal */}
      <RealTimePostEditor
        isOpen={isPostEditorOpen}
        onClose={() => {
          setIsPostEditorOpen(false)
          setEditingPost(null)
        }}
        post={editingPost}
      />
    </div>
  )
}

export default function RealTimeBlogPage() {
  return (
    <AuthProvider>
      <RealTimeBlogProvider>
        <RealTimeBlogContent />
      </RealTimeBlogProvider>
    </AuthProvider>
  )
}
