import { QueryProvider } from "./QueryProvider"
import { RouterProvider } from "./RouterProvider"

export function Providers() {
  return (
    <QueryProvider>
      <RouterProvider />
    </QueryProvider>
  )
}
