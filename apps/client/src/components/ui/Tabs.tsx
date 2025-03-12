import { cn } from "@/lib/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { classed } from "@tw-classed/react";
import { ReactNode } from "react";

const TabsList = classed(
  TabsPrimitive.List,
  "inline-flex min-h-10 items-center justify-center rounded-lg bg-base-muted p-1 text-base-muted-foreground",
  {
    variants: {
      size: {
        default: "h-10",
        sm: "h-8",
        lg: "h-12",
      },
    },
  },
);

const TabsTrigger = classed(
  TabsPrimitive.Trigger,
  "inline-flex items-center text-black font-inter justify-center whitespace-nowrap rounded-lg px-3 py-1 ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  "data-[state=active]:bg-base-background data-[state=active]:text-base-foreground data-[state=active]:shadow-tabs",
  "data-[state=inactive]:text-base-muted-foreground data-[state=active]:shadow-none",
  {
    variants: {
      bold: {
        true: "font-bold",
        false: "font-medium",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
      },
    },
    defaultVariants: {
      bold: false,
      size: "sm",
    },
  },
);

const TabsContent = classed(
  TabsPrimitive.Content,
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

TabsContent.displayName = TabsPrimitive.Content.displayName;
TabsList.displayName = TabsPrimitive.List.displayName;
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface TabsProps extends TabsPrimitive.TabsProps {
  size?: "sm" | "lg" | "xs";
  defaultValue?: string;
  items: {
    id: string;
    label: string;
    content?: ReactNode;
    onClick?: () => void;
  }[];
  minWidth?: number;
}

const Tabs = ({
  size = "sm",
  defaultValue,
  items = [],
  className,
  minWidth,
  ...props
}: TabsProps) => (
  <TabsPrimitive.Root defaultValue={defaultValue} {...props}>
    <TabsList
      className={cn("grid w-fit", className)}
      style={{
        gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      }}
    >
      {items.map((item) => (
        <TabsTrigger
          key={item.id}
          value={item.id}
          size={size as any}
          onClick={item?.onClick}
          style={{
            minWidth: minWidth ? `${minWidth}px` : undefined,
          }}
        >
          {item.label}
        </TabsTrigger>
      ))}
    </TabsList>

    <>
      {items.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          {item.content}
        </TabsContent>
      ))}
    </>
  </TabsPrimitive.Root>
);

export { Tabs };
