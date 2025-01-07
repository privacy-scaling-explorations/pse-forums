import { createFileRoute, Outlet } from "@tanstack/react-router"
import { Header } from "c/Header"

export const Route = createFileRoute("/_layout")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  )
}
