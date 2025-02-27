import * as React from "react";

import { cn } from "@/lib/utils";
import { classed } from "@tw-classed/react";

const Card = classed.div(
  "flex flex-col border bg-card text-card-foreground border border-[#E4E4E7]",
  {
    variants: {
      background: {
        default: "bg-[#FAFAFA]",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded-[6px]",
        md: "rounded-[12px]",
      },
      spacing: {
        sm: "p-[14px]",
        md: "p-[24px]",
      },
      gap: {
        6: "gap-6",
        4: "gap-4",
        "2.5": "gap-[10px]",
      },
      withHover: {  
        true: "hover:bg-white-light duration-200",
        false: "",
      },
    },
    defaultVariants: {
      rounded: "sm",
      spacing: "md",
      background: "default",
      gap: "6",
      withHover: false,
    },
  },
);

Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
