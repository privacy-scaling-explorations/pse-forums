import { createFileRoute } from "@tanstack/react-router"
import { Settings } from "c/forms/Settings"

export const Route = createFileRoute("/settings")({
  component: Settings,
})
