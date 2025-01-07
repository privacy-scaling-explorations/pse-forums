import type { ReactNode } from "react"
import { QueryProvider } from "./QueryProvider"
import { RouterProvider } from "./RouterProvider"
import { ThemeProvider } from "./ThemeProvider"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider />
        {children}
      </ThemeProvider>
    </QueryProvider>
  )
}
