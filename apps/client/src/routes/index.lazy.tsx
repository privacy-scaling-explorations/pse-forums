import { createLazyFileRoute, Link } from "@tanstack/react-router"
import { PostCard } from "c/PostCard"
import { DEFAULT_GROUP_ID } from "l/constants"
import { useQuery } from "l/rspc"
import { Button } from "ui/button"

export const Route = createLazyFileRoute("/")({
  component: Index,
})

function Index() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery(["post.read_by_group", DEFAULT_GROUP_ID])

  // TODO Error state
  if (error) {
    console.error(error.message)
    return <div>{error.message}</div>
  }

  // TODO Loading state
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between mb-2">
        <Button variant="secondary">All</Button>
        <Link to="/post/create">
          <Button>+ New Post</Button>
        </Link>
      </div>
      <ol className="space-y-2">
        {posts?.map((p) => <PostCard key={p.id} {...p} />)}
      </ol>
    </div>
  )
}
