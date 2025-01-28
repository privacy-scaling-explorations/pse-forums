import { createFileRoute } from "@tanstack/react-router"
import { Post } from "components/Post"
import { rspc } from "l/rspc"

export const Route = createFileRoute("/post/$pid")({
  loader: async ({ params: { pid } }) => rspc.query(["post.read", Number.parseInt(pid)]),
  component: Post,
  // errorComponent: TODO,
  // notFoundComponent: TODO,
})
