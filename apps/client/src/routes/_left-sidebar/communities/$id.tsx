import { CommunityPage } from "@/sections/Communities/CommunityPage";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_left-sidebar/communities/$id")({
  component: CommunityPage,
});
