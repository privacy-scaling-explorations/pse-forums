import { classed, VariantProps } from "@tw-classed/react"

const BadgeBase = classed.div(
  "inline-flex items-center border px-2.5 py-0.5 text-xs leading-[16px] duration-200 font-inter font-semibold focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        black: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80 group-hover:bg-primary/80",
        white: "border-transparent bg-white-light text-secondary-foreground group-hover:bg-[#71717A] group-hover:text-white",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
      rounded: {
        sm: "rounded-[6px]",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "black",
      rounded: "sm",
    },
  },
)


export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof BadgeBase> {}

const Badge = ({ className, ...props }: BadgeProps) => {
  return <BadgeBase {...props} />
}

export { Badge }
