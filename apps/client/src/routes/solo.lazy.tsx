import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/solo")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/solo"!</div>
}
