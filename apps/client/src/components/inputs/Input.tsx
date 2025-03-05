import { classed, VariantProps } from "@tw-classed/react";
import { LucideIcon } from "lucide-react";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputWrapperProps {
  label?: string;
  description?: string;
  children?: ReactNode;
  containerClassName?: string;
}

export const InputWrapper = ({
  label,
  description,
  children,
  containerClassName,
}: InputWrapperProps) => {
  return (
    <div className={cn("flex flex-col gap-2 relative", containerClassName)}>
      {label && (
        <span className="text-sm font-medium text-black font-inter">
          {label}
        </span>
      )}
      {children}
      {description && (
        <span className="text-sm text-black-secondary font-inter">
          {description}
        </span>
      )}
    </div>
  );
};

export const InputBase = classed.input(
  "flex min-h-9 w-full rounded-md border border-[#E4E4E7] bg-transparent py-1 text-sm shadow-input transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-black-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      withIcon: {
        true: "pl-8 pr-3",
        false: "px-3",
      },
    },
  },
);

interface InputProps extends VariantProps<typeof InputBase>, InputWrapperProps {
  icon?: LucideIcon;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, label, description, containerClassName, className, ...props }, ref) => {
    const Icon = icon;
    return (
      <InputWrapper
        label={label}
        description={description}
        containerClassName={containerClassName}
      >
        <InputBase ref={ref} {...props} withIcon={!!icon} />
        {Icon && (
          <Icon className="absolute left-2 top-2.5 h-4 w-4 text-black-secondary" />
        )}
      </InputWrapper>
    );
  },
);
Input.displayName = "Input";

export { Input };
