import { TooltipProvider } from "c/ui/tooltip"
import { QueryProvider } from "./QueryProvider"
import { RouterProvider } from "./RouterProvider"

export function Providers() {
  return (
    <QueryProvider>
      <TooltipProvider delayDuration={0}>
        <RouterProvider />
      </TooltipProvider>
    </QueryProvider>
  )
}
