import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_layout/notifications")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/notifications"!</div>
}
