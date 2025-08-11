"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Share2, Bookmark, ThumbsUp, Edit, Trash2, Clock } from "lucide-react"
import { AuthProvider, useAuth } from "@/contexts/auth-context"
import { RealTimeBlogProvider, useRealTimeBlog } from "@/contexts/real-time-blog-context"
import RealTimePostEditor from "@/components/blog/real-time-post-editor"
import { formatDate } from "@/lib/utils"
import BlogLoading from "@/components/blog/blog-loading"

function BlogPostContent({ slug }: { slug: string }) {
  const { currentUser } = useAuth()
  const { getPostBySlug, deletePost } = useRealTimeBlog()
  const [post, setPost] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPostEditorOpen, setIsPostEditorOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true)
      const postData = await getPostBySlug(slug)
      setPost(postData)
      setIsLoading(false)
    }

    fetchPost()
  }, [slug, getPostBySlug])

  const handleDeletePost = async () => {
    if (!post) return

    if (window.confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      setIsDeleting(true)
      try {
        const success = await deletePost(post.id)
        if (success) {
          window.location.href = "/blog"
        } else {
          alert("Failed to delete post. You may not have permission.")
        }
      } finally {
        setIsDeleting(false)
      }
    }
  }

  if (isLoading) {
    return <BlogLoading />
  }

  if (!post) {
    return (
      <div className="pt-20 pb-16 min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-8 text-slate-600 dark:text-slate-400">The blog post you're looking for doesn't exist.</p>
          <Link
            href="/blog"
            className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  const canEditPost =
    currentUser &&
    (currentUser.id === post.author_id ||
      ["admin", "president", "co-president", "communications-director"].includes(currentUser.role))

  return (
    <div className="pt-20 pb-16 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <Link href="/blog" className="inline-flex items-center text-sky-500 hover:text-sky-600 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to all posts
          </Link>
        </div>

        <article className="max-w-4xl mx-auto">
          <div className="relative h-80 w-full mb-8 rounded-2xl overflow-hidden">
            <Image
              src={post.image_url || "/images/placeholder.png"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent flex items-end">
              <div className="p-8">
                <span className="bg-sky-500 text-white text-sm font-bold py-1 px-3 rounded-full mb-4 inline-block">
                  {post.categories?.name || "Uncategorized"}
                </span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{post.title}</h1>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex justify-between items-center mb-8 pb-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900 flex items-center justify-center mr-3">
                  <User className="h-5 w-5 text-sky-500" />
                </div>
                <div>
                  <p className="font-medium">{`${post.profiles?.first_name || ""} ${post.profiles?.last_name || ""}`}</p>
                  <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(post.published_at)}</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                {canEditPost && (
                  <>
                    <button
                      onClick={() => setIsPostEditorOpen(true)}
                      className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={handleDeletePost}
                      disabled={isDeleting}
                      className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    >
                      {isDeleting ? (
                        <svg
                          className="animate-spin h-4.5 w-4.5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                      ) : (
                        <Trash2 size={18} />
                      )}
                    </button>
                  </>
                )}
                <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  <Share2 size={18} />
                </button>
                <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  <Bookmark size={18} />
                </button>
                <button className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-sky-100 dark:hover:bg-sky-900/30 hover:text-sky-500 dark:hover:text-sky-400 transition-colors">
                  <ThumbsUp size={18} />
                </button>
              </div>
            </div>

            {/* Edit History */}
            {post.edit_history && post.edit_history.length > 0 && (
              <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <Clock size={14} className="mr-1" />
                  <span>Edit History</span>
                </div>
                <ul className="space-y-1 text-sm">
                  {post.edit_history.map((edit: any, index: number) => (
                    <li key={index} className="text-slate-600 dark:text-slate-400">
                      Edited by {`${edit.profiles?.first_name || ""} ${edit.profiles?.last_name || ""}`} on{" "}
                      {formatDate(edit.edited_at)}
                      {edit.change_description && `: ${edit.change_description}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div
              className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-sky-500 prose-a:text-sky-600 dark:prose-a:text-sky-400 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          <div className="flex justify-between">
            <Link
              href="/blog"
              className="bg-white dark:bg-slate-800 text-sky-500 dark:text-sky-400 border border-sky-500 dark:border-sky-400 font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:bg-sky-50 dark:hover:bg-slate-700"
            >
              Back to Blog
            </Link>

            <Link
              href="#comments"
              className="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Join the Discussion
            </Link>
          </div>
        </article>
      </div>

      {/* Post Editor Modal */}
      <RealTimePostEditor isOpen={isPostEditorOpen} onClose={() => setIsPostEditorOpen(false)} post={post} />
    </div>
  )
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  return (
    <AuthProvider>
      <RealTimeBlogProvider>
        <BlogPostContent slug={params.id} />
      </RealTimeBlogProvider>
    </AuthProvider>
  )
}
