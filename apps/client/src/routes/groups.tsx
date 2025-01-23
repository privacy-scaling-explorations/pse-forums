import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/groups")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/groups"!</div>
}
