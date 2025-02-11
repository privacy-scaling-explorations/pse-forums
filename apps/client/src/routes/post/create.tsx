import { createFileRoute } from "@tanstack/react-router"
import { PostForm as component } from "c/forms/PostForm"
import { rspc } from "l/rspc"

export const Route = createFileRoute("/post/create")({
  component,
  loader: async () =>
    rspc
      .query(["group.list"])
      .then((groups) => groups.map(({ id, name }) => ({ id, name }))),
})
