import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { SidebarProvider } from "p/SidebarProvider"

export const Route = createRootRoute({
  component: () => (
    <>
      <SidebarProvider>
        <Outlet />
      </SidebarProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
