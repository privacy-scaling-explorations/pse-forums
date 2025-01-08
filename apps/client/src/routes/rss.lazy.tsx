import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/rss")({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/rss"!</div>
}
