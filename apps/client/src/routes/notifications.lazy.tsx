import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/notifications")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>TODO Notifications page</div>
}
