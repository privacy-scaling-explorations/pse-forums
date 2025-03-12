import { cn } from "@/lib/utils";
import { classed } from "@tw-classed/react";
import { forwardRef } from "react";

const CardBase = classed.div(
  "flex flex-col",
  {
    variants: {
      variant: {
        base: "bg-base-background border border-base-border",
        secondary: "bg-sidebar-background",
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
        1: "gap-1",
      },
      withHover: {  
        true: "hover:bg-card-hover duration-200",
        false: "",
      },
    },
    defaultVariants: {
      rounded: "sm",
      spacing: "md",
      variant: "base",
      gap: "6",
      withHover: false,
    },
  },
);

const CardHeader = forwardRef<
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

const CardTitle = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-xl font-semibold leading-none tracking-tight text-base-foreground",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-base-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<
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

export const Card = {
  displayName: "Card",
  Base: CardBase,
  Title: CardTitle,
  Header: CardHeader,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
};
