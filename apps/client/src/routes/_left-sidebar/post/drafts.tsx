import { createFileRoute } from "@tanstack/react-router";
import { PostDrafts } from "@/sections/Post/PostDrafts";

export const Route = createFileRoute("/_left-sidebar/post/drafts")({
  component: PostDrafts,
});
