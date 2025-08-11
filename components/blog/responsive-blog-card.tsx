import Link from "next/link"
import Image from "next/image"
import { Calendar, User } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { BlogPost } from "@/contexts/real-time-blog-context"

interface ResponsiveBlogCardProps {
  post: BlogPost
  isFeature?: boolean
}

export default function ResponsiveBlogCard({ post, isFeature = false }: ResponsiveBlogCardProps) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-xl ${
        isFeature ? "" : "hover:scale-105"
      } relative`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className={`relative ${isFeature ? "h-64 lg:h-80" : "h-48"}`}>
          <Image src={post.image_url || "/images/placeholder.png"} alt={post.title} fill className="object-cover" />
          <div className="absolute top-4 right-4 bg-sky-500 text-white text-sm font-bold py-1 px-3 rounded-full">
            {post.categories?.name || "Uncategorized"}
          </div>
        </div>

        <div className="p-6">
          <h3 className={`${isFeature ? "text-2xl" : "text-xl"} font-bold mb-3 line-clamp-2`}>{post.title}</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{post.excerpt}</p>

          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center">
              <User size={14} className="mr-1" />
              <span className="truncate max-w-[120px]">{`${post.profiles?.first_name || ""} ${post.profiles?.last_name || ""}`}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={14} className="mr-1" />
              <span>{formatDate(post.published_at)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
