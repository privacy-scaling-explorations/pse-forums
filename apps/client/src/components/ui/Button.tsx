import { classed, VariantProps } from "@tw-classed/react";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

const ButtonComponent = classed.button(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap font-inter rounded-md text-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  "focus:outline-none focus:ring-0 outline-none focus:ring-offset-0 focus:outline-none",
  {
    variants: {
      variant: {
        black: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        error: "bg-[#FEE2E2] text-[#DC2626] hover:bg-[#FEE2E2] border border-[#DC2626]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-sm leading-5",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "black",
      size: "sm",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonComponent> {
  asChild?: boolean;
  icon?: LucideIcon;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, icon, ...props }, ref) => {
    const Icon = icon;
    return (
      <ButtonComponent ref={ref} {...props}>
        {Icon && <Icon className="size-4" />}
        {props.children}
      </ButtonComponent>
    );
  },
);

Button.displayName = "Button";

export { Button };
