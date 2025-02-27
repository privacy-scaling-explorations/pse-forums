import { createFileRoute } from "@tanstack/react-router"
import { PostForm as component } from "@/components/forms/PostForm"

export const Route = createFileRoute("/_app/post/create")({
  component,
  /*loader: async () =>
    rspc
      .query(["group.list"])
      .then((groups) => groups.map(({ id, name }) => ({ id, name }))),*/
})
