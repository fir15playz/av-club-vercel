"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useRealTimeBlog, type BlogPost } from "@/contexts/real-time-blog-context"
import { useAuth } from "@/contexts/auth-context"

interface PostEditorProps {
  isOpen: boolean
  onClose: () => void
  post?: BlogPost
}

export default function RealTimePostEditor({ isOpen, onClose, post }: PostEditorProps) {
  const { categories, addPost, updatePost } = useRealTimeBlog()
  const { currentUser } = useAuth()

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category_id: 0,
    image_url: "",
    is_featured: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [changeDescription, setChangeDescription] = useState("")

  // Initialize form with post data if editing
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category_id: post.category_id,
        image_url: post.image_url || "",
        is_featured: post.is_featured,
      })
    } else {
      // Reset form when creating a new post
      setFormData({
        title: "",
        excerpt: "",
        content: "",
        category_id: 0,
        image_url: "",
        is_featured: false,
      })
    }
  }, [post])

  if (!isOpen) return null
  if (!currentUser) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    try {
      if (post) {
        // Editing existing post
        const result = await updatePost(
          post.id,
          {
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            category_id: Number(formData.category_id),
            image_url: formData.image_url || null,
            is_featured: formData.is_featured,
          },
          changeDescription || "Updated post",
        )

        if (result) {
          setSuccess("Post updated successfully!")
          setTimeout(() => {
            onClose()
          }, 1500)
        } else {
          setError("Failed to update post. You may not have permission.")
        }
      } else {
        // Creating new post
        const result = await addPost({
          title: formData.title,
          slug: "", // Will be generated on the server
          excerpt: formData.excerpt,
          content: formData.content,
          category_id: Number(formData.category_id),
          image_url: formData.image_url || null,
          is_featured: formData.is_featured,
        })

        if (result) {
          setSuccess("Post created successfully!")
          setTimeout(() => {
            onClose()
          }, 1500)
        } else {
          setError("Failed to create post")
        }
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 max-w-4xl w-full h-[90vh] shadow-xl overflow-y-auto">
        <div className="flex justify-between items-center mb-4 sticky top-0 bg-white dark:bg-slate-800 z-10 pb-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold">{post ? "Edit Post" : "Create New Post"}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-3 rounded-md mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Excerpt *
            </label>
            <textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              required
              rows={2}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Content *
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={12}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              placeholder="HTML content is supported"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="category_id"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Category *
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
              >
                <option value="">Select Category</option>
                {categories
                  .filter((cat) => cat.name !== "All")
                  .map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label htmlFor="image_url" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="image_url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                placeholder="/images/placeholder.png"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="is_featured"
              name="is_featured"
              checked={formData.is_featured}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-sky-500 focus:ring-sky-500 border-slate-300 rounded"
            />
            <label htmlFor="is_featured" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
              Feature this post
            </label>
          </div>

          {post && (
            <div>
              <label
                htmlFor="changeDescription"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
              >
                Change Description
              </label>
              <input
                type="text"
                id="changeDescription"
                value={changeDescription}
                onChange={(e) => setChangeDescription(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                placeholder="Describe what you changed (optional)"
              />
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              ) : post ? (
                "Update Post"
              ) : (
                "Create Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
