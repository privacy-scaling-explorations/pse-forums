import { TooltipProvider } from "c/ui/tooltip"
import { QueryProvider } from "./QueryProvider"
import { RouterProvider } from "./RouterProvider"
import { AuthProvider } from "./AuthProvider"

export function Providers() {
  return (
    <AuthProvider>
      <QueryProvider>
        <TooltipProvider delayDuration={0}>
          <RouterProvider />
        </TooltipProvider>
      </QueryProvider>
    </AuthProvider>
  )
}
