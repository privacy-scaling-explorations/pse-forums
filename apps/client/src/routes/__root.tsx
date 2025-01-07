import { createRootRoute, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { SidebarProvider } from "p/SidebarProvider"

export const Route = createRootRoute({
  component: () => (
    <>
      <header>
        <h1>Freedit</h1>
      </header>
      <SidebarProvider>
        <main>
          <Outlet />
        </main>
      </SidebarProvider>
      <TanStackRouterDevtools />
    </>
  ),
})
