// src/components/layout/MainLayout.tsx
import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import { Header } from "c/Header"
import { LeftSidebar } from "c/LeftSidebar"
import { RightSidebar } from "c/RightSidebar"

export function Layout() {
  return (
    <div>
      <Header />
      <main>
        <div className="flex gap-4">
          <LeftSidebar />
          <div className="flex-1">
            <Outlet />
          </div>
          <RightSidebar />
        </div>
      </main>
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
