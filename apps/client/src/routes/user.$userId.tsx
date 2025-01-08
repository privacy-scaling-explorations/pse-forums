import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/user/$userId")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/user/$userId"!</div>
}
