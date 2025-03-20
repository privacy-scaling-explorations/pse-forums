import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/sections/App";

export const Route = createFileRoute("/_app/")({
  component: HomePage,
});

