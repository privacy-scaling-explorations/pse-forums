import { ProfilePage } from "@/components/sections/Profile";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/_left-sidebar/profile")({
  component: ProfilePage,
});
