import { classed, VariantProps } from "@tw-classed/react"

const BadgeBase = classed.div(
  "inline-flex items-center border px-2.5 py-0.5 text-xs leading-[16px] duration-200 font-inter font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "border-transparent bg-base-primary text-primary-foreground hover:bg-base-primary/80 group-hover:bg-base-primary/80",
        secondary: "border-transparent bg-base-secondary text-base-secondary-foreground hover:text-base-primary-foreground hover:bg-base-muted-foreground group-hover:bg-base-muted-foreground group-hover:text-base-primary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      rounded: {
        sm: "rounded-[6px]",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "secondary",
      rounded: "sm",
    },
  },
)


export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof BadgeBase> {}

const Badge = ({ className, ...props }: BadgeProps) => {
  return <BadgeBase {...props} />
}

export { Badge }
