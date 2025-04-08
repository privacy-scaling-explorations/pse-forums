import { classed } from "@tw-classed/react";
import { LucideIcon } from "lucide-react";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Info as InfoIcon } from "lucide-react";
import { FieldApi } from "@tanstack/react-form";
export interface InputWrapperProps {
  header?: ReactNode;
  label?: string;
  description?: string;
  children?: ReactNode;
  containerClassName?: string;
  error?: string;
  field?: FieldApi<any, any, any, any>;
  showCounter?: boolean;
  value?: string;
  maxLength?: number;
}

interface InputProps
  extends React.ComponentProps<typeof InputBase>,
    InputWrapperProps {
  icon?: LucideIcon;
  error?: string;
  field?: FieldApi<any, any, any, any>;
  showCounter?: boolean;
  value?: string;
  maxLength?: number;
}

export const InputWrapper = ({
  header,
  label,
  description,
  children,
  containerClassName,
  error,
  showCounter = false,
  value = "",
  maxLength,
}: InputWrapperProps) => {
  const hasError = !!error;
  return (
    <div className={cn("relative flex flex-col gap-2", containerClassName)}>
      {header && <div className="pb-1">{header}</div>}
      {label && (
        <span className="text-sm font-medium text-base-foreground font-inter">
          {label}
        </span>
      )}
      {children}
      {!hasError ? (
        <div className="flex items-center justify-between">
          <span className="text-sm text-base-muted-foreground font-inter">
            {description}
          </span>
          {showCounter && (
            <span className="text-sm text-base-muted-foreground font-inter">
              {(value as string)?.length ?? 0} / {maxLength}
            </span>
          )}
        </div>
      ) : (
        <div className="flex gap-1 items-center">
          <InfoIcon className="size-[14px] text-error" />
          <span className="text-sm text-error font-inter">{error}</span>
        </div>
      )}
    </div>
  );
};

export const InputBase = classed.input(
  "flex min-h-9 w-full rounded-md text-base-foreground bg-base-background py-1 text-sm shadow-base transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-base-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
  {
    variants: {
      withIcon: {
        true: "pl-8 pr-3",
        false: "px-3",
      },
      withError: {
        true: "border border-error",
        false:
          "border border-base-input focus-visible:ring-1 focus-visible:ring-ring",
      },
    },
  },
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      label,
      description,
      containerClassName,
      className,
      field,
      showCounter = false,
      maxLength,
      ...props
    },
    ref,
  ) => {
    const Icon = icon;

    const error =
      field?.state.meta.isTouched && field?.state.meta.errors.length
        ? field?.state.meta.errors.join(", ")
        : "";

    return (
      <InputWrapper
        label={label}
        description={description}
        containerClassName={containerClassName}
        error={error}
        showCounter={showCounter}
        maxLength={maxLength}
      >
        <InputBase ref={ref} {...props} withIcon={!!icon} withError={!!error} />
        {Icon && (
          <Icon className="absolute left-2 top-2.5 h-4 w-4 text-black-secondary" />
        )}
      </InputWrapper>
    );
  },
);
Input.displayName = "Input";

export { Input };
