import { GlobalProvider } from "@/contexts/GlobalContext";
import { QueryProvider } from "./QueryProvider";
import { RouterProvider } from "./RouterProvider";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

export function Providers() {
  return (
    <QueryProvider>
      <TooltipPrimitive.Provider delayDuration={0}>
        <GlobalProvider>
          <RouterProvider />
        </GlobalProvider>
      </TooltipPrimitive.Provider>
    </QueryProvider>
  );
}
