import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/_layout/solo")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/solo"!</div>
}
