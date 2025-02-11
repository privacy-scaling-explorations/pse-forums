import { createFileRoute } from "@tanstack/react-router"
import { Post } from "components/Post"
import { rspc } from "l/rspc"

export const Route = createFileRoute("/post/$pid")({
  component: Post,
  loader: async ({ params: { pid } }) => rspc.query(["post.read", Number.parseInt(pid)]),
  // errorComponent: TODO,
  // notFoundComponent: TODO,
})
