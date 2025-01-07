import { QueryProvider } from "./QueryProvider"
import { RouterProvider } from "./RouterProvider"
import { ThemeProvider } from "./ThemeProvider"

export function Providers() {
  return (
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider />
      </ThemeProvider>
    </QueryProvider>
  )
}
