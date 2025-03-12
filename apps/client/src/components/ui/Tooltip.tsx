"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { forwardRef, ReactNode } from "react";

import { classed } from "@tw-classed/react";

const TooltipBase = classed(
  TooltipPrimitive.Content,
  "z-50 overflow-hidden rounded-md bg-base-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
);

const TooltipContent = forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipBase ref={ref} sideOffset={sideOffset} {...props} />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  if (content?.length === 0) {
    return children;
  }
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            className="bg-black text-white text-sm px-2 py-1 rounded"
            sideOffset={5}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-black" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};
