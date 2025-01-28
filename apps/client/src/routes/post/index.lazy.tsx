import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/post/")({
  component: PostIndex,
})

function PostIndex() {
  return <div>PostIndex</div>
}
