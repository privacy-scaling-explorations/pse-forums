import { createFileRoute } from "@tanstack/react-router";

import { PostPage } from "@/sections/Post/PostPage";

export const Route = createFileRoute("/_app/posts/$postId")({
  component: PostPage,
  loader: async ({ params: { postId } }) => {
    return {
      postId: postId,
    };
  },
});
