import { GlobalProvider } from "@/contexts/GlobalContext";
import { QueryProvider } from "./QueryProvider";
import { RouterProvider } from "./RouterProvider";
import { TooltipProvider } from "@/components/ui/Tooltip";
export function Providers() {
  return (
    <QueryProvider>
      <TooltipProvider delayDuration={0}>
        <GlobalProvider>
          <RouterProvider />
        </GlobalProvider>
      </TooltipProvider>
    </QueryProvider>
  );
}
