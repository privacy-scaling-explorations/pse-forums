import { AddNewBadge } from "@/sections/MyBadges/AddNewBadge";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_left-sidebar/badges/new")({
  component: AddNewBadge,
});
