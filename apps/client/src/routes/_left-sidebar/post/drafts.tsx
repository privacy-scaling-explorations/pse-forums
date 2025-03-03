import { PostDrafts } from "@/components/Post/PostDrafts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_left-sidebar/post/drafts")({
  component: PostDrafts,
});
