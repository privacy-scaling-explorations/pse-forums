import { createFileRoute } from "@tanstack/react-router";
import { PostDrafts } from "@/components/sections/Post/PostDrafts";
export const Route = createFileRoute("/_left-sidebar/post/drafts")({
  component: PostDrafts,
});
