import { classed } from "@tw-classed/react";
import { forwardRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Info as InfoIcon } from "lucide-react";
import { FieldApi } from "@tanstack/react-form";
import { Tooltip } from "@/components/ui/Tooltip";

export interface SwitchWrapperProps {
  header?: ReactNode;
  label?: string;
  description?: string;
  children?: ReactNode;
  containerClassName?: string;
  error?: string;
  field?: FieldApi<any, any, any, any>;
  tooltip?: string;
}


const SwitchWrapper = ({
  header,
  label,
  description,
  children,
  containerClassName,
  error,
  tooltip,
}: SwitchWrapperProps) => {
  const hasError = !!error;

  return (
    <div className={cn("relative flex flex-col gap-1", containerClassName)}>
      {header && <div>{header}</div>}

      <div className="flex items-center gap-5 justify-between">
        <div className="flex items-center gap-2">
          {tooltip && (
            <Tooltip content={tooltip}>
              <InfoIcon className="h-4 w-4" />
            </Tooltip>
          )}
          {label && (
            <span className="text-base font-medium text-base-foreground font-inter">
              {label}
            </span>
          )}
        </div>
        {children}
      </div>

      {!hasError ? (
        description && (
          <span className="text-xs text-base-muted-foreground font-inter italic text-right">
            {description}
          </span>
        )
      ) : (
        <div className="flex gap-1 items-center">
          <InfoIcon className="size-[14PX] text-error" />
          <span className="text-sm text-error font-inter">{error}</span>
        </div>
      )}
    </div>
  );
};

const SwitchBase = classed.input(
  "appearance-none",
  "relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full transition-colors",
  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
  "bg-base-input",
  "[&:checked]:bg-base-primary",
  "after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:shadow-md after:transition-transform after:duration-200 [&:checked]:after:translate-x-[16px]",

);


interface SwitchProps
  extends Omit<React.ComponentProps<typeof SwitchBase>, "type">,
    SwitchWrapperProps {
  field?: FieldApi<any, any, any, any>;
  tooltip?: string;
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, containerClassName, field, tooltip, ...props }, ref) => {
    const error =
      field?.state.meta.isTouched && field?.state.meta.errors.length
        ? field.state.meta.errors.join(", ")
        : "";

    return (
      <SwitchWrapper
        label={label}
        description={description}
        containerClassName={containerClassName}
        error={error}
        tooltip={tooltip}
      >
        <SwitchBase ref={ref} type="checkbox" {...props} />
      </SwitchWrapper>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };