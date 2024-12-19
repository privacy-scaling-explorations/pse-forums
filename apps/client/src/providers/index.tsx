import type { ReactNode } from "react"
import { QueryProvider } from "./QueryProvider"
import { RouterProvider } from "./RouterProvider"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <RouterProvider />
      {children}
    </QueryProvider>
  )
}
