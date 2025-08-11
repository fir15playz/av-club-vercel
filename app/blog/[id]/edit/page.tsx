import { notFound } from "next/navigation"
import { db } from "@/db"
import PostForm from "./components/post-form"

interface Props {
  params: {
    id: string
  }
}

export default async function EditPostPage({ params }: Props) {
  const { id } = params

  const post = await db.query.postsTable.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
  })

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1>Edit Post</h1>
      <PostForm initialValues={post} />
    </div>
  )
}
