import type React from "react"
import Link from "next/link"
import type { BlogPost } from "@/types/blog"

interface BlogPostCardProps {
  post: BlogPost
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={post.coverImage || "/placeholder.svg"} alt={post.title} />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 text-base">{post.excerpt}</p>
        <Link
          href={`/blog/${post.id}`}
          className="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogPostCard
