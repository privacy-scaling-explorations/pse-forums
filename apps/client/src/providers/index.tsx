import { TooltipProvider } from "c/ui/tooltip"
import { AuthProvider } from "./AuthProvider"
import { QueryProvider } from "./QueryProvider"
import { RouterProvider } from "./RouterProvider"

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
