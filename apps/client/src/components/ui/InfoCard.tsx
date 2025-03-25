import { cn } from "@/lib/utils";
import { classed } from "@tw-classed/react";

const InfoCardBase = classed.div({
  base: "flex flex-col ",
  variants: {
    variant: {
      card: "p-2 rounded-md bg-accent text-center",
      base: "text-xs font-inter font-medium text-base-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "card",
  },
});

const InfoCardValue = classed.span({
  base: "font-inter text-base-foreground font-bold",
  variants: {
    fontSize: {
      sm: "text-sm",
      md: "text-md",
      lg: "text-xl",
    },
  },
  defaultVariants: {
    fontSize: "sm",
  },
});

export const InfoCard = ({
  label,
  value,
  className,
  variant = "card",
  fontSize = "sm",
}: {
  label: string;
  value: string | number;
  className?: string;
  variant?: "card" | "base";
  fontSize?: "sm" | "md" | "lg";
}) => {
  return (
    <InfoCardBase className={cn(className)} variant={variant}>
      <InfoCardValue fontSize={fontSize}>{value}</InfoCardValue>

      <span className="text-xs font-inter font-medium text-base-muted-foreground">
        {label}
      </span>
    </InfoCardBase>
  );
};
