import { PostCreate } from "@/components/sections/Post/PostCreate";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_left-sidebar/post/create")({
  component: PostCreate,
  /*loader: async () =>
    rspc
      .query(["group.list"])
      .then((groups) => groups.map(({ id, name }) => ({ id, name }))),*/
});
