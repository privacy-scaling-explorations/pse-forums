import { createLazyFileRoute } from "@tanstack/react-router"
import { PostCard } from "c/PostCard"
import { Button } from "c/ui/button"
import { Card } from "c/ui/card"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

const posts = [
  {
    created_at: "2023-03-01",
    inn_name: "Inn",
    title: "Title",
    username: "Username",
  },
  {
    created_at: "2023-03-01",
    inn_name: "Inn",
    title: "Title",
    username: "Username",
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
        {posts.map((p) => <PostCard key={p.created_at} {...p} />)}
      </ol>
    </div>
  )
}
