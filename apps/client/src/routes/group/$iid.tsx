import { createFileRoute } from "@tanstack/react-router"
import { Inn } from "components/Inn"
import { api } from "lib/api"

export const Route = createFileRoute("/group/$iid")({
  loader: async ({ params: { iid } }) => api(`inn/${iid}`),
  component: Inn,
  // errorComponent: TODO,
  // notFoundComponent: TODO,
})
