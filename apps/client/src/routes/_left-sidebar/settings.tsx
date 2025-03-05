import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/sections/Settings";
export const Route = createFileRoute("/_left-sidebar/settings")({
  component: SettingsPage,
});
