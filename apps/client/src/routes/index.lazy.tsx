import { createLazyFileRoute } from "@tanstack/react-router"
import { PostCard } from "c/PostCard"
import { PostDto } from "l/bindings"
import { Button } from "ui/button"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

const posts: PostDto[] = [
  {
    id: 0,
    title: "Title 1",
    content: "Post numero uno",
    tags: ["first", "dibs"]
  },
  {
    id: 1,
    title: "Title 2",
    content: "A second post",
    tags: ["two"]
  },
]

function Index() {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <Button variant="secondary">All</Button>
        <Button>+ New Post</Button>
      </div>
      <ol className="space-y-2">
        {posts.map((p) => <PostCard key={p.id} {...p} />)}
      </ol>
    </div>
  )
}
