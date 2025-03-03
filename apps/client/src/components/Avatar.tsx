import { classed } from "@tw-classed/react";
import type { FC } from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@/lib/utils";
const RandomBackgroundColors = [
  "bg-red-600",
  "bg-blue-600",
  "bg-green-600",
  "bg-yellow-600",
  "bg-purple-600",
  "bg-orange-600",
  "bg-pink-600",
  "bg-teal-600",
  "bg-lime-600",
  "bg-amber-600",
  "bg-fuchsia-600",
  "bg-indigo-600",
];

const AvatarBase = classed(
  AvatarPrimitive.Root,
  "flex overflow-hidden rounded-full shrink-0 relative",
  {
    variants: {
      size: {
        sm: "h-5 w-5",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "size-[78px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const AvatarImage = classed(
  AvatarPrimitive.Image,
  "object-cover aspect-square h-full w-full",
);

const AvatarFallback = classed(
  AvatarPrimitive.Fallback,
  "flex h-full w-full items-center justify-center",
);

type AvatarProps = React.ComponentProps<typeof AvatarBase> & {
  src?: string;
  username?: string | null;
  hasRandomBackground?: boolean;
  className?: string;
};

export const Avatar: FC<AvatarProps> = ({
  src,
  username,
  hasRandomBackground,
  className,
  ...props
}) => {
  const fallbackBackground = hasRandomBackground
    ? RandomBackgroundColors[
        Math.floor(Math.random() * RandomBackgroundColors.length)
      ]
    : "bg-muted";

  return (
    <AvatarBase {...props} className={cn(className)}>
      <AvatarImage src={src} />
      <AvatarFallback className={fallbackBackground}>
        {username?.[0].toLocaleUpperCase() || ""}
      </AvatarFallback>
    </AvatarBase>
  );
};
