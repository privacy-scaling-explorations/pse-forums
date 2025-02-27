import * as TabsPrimitive from "@radix-ui/react-tabs";

import { classed } from "@tw-classed/react";
import { ReactNode } from "react";

const TabsList = classed(
  TabsPrimitive.List,
  "inline-flex h-10 items-center justify-center rounded-lg bg-white-light p-1 text-muted-foreground",
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
  "inline-flex items-center text-black font-inter justify-center whitespace-nowrap rounded-lg px-3 py-1 text-sm ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  "data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-tabs",
  "data-[state=inactive]:text-[#71717A] data-[state=active]:shadow-none",
  {
    variants: {
      bold: {
        true: "font-bold",
        false: "font-medium",
      },
    },
    defaultVariants: {
      bold: false,
    },
  },
);

const TabsContent = classed(
  TabsPrimitive.Content,
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
);

TabsContent.displayName = TabsPrimitive.Content.displayName;
TabsList.displayName = TabsPrimitive.List.displayName;
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

interface TabsProps extends TabsPrimitive.TabsProps {
  size?: "sm" | "lg";
  defaultValue?: string;
  items: {
    id: string;
    label: string;
    content: ReactNode;
  }[];
}

export const Tabs = ({
  size = "sm",
  defaultValue,
  items = [],
  ...props
}: TabsProps) => (
  <TabsPrimitive.Root defaultValue={defaultValue} {...props}>
    <TabsList className="grid w-[420px] grid-cols-2">
      {items.map((item) => (
        <TabsTrigger key={item.id} value={item.id}>
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
