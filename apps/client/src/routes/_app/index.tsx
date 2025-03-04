import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/sections/App";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

