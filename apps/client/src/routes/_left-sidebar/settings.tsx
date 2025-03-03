import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/components/sections/Settings";

export const Route = createFileRoute("/_left-sidebar/settings")({
  component: SettingsPage,
});
