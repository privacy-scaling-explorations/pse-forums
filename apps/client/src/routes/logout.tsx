import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/logout")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/logout"!</div>
}
