import { classed } from "@tw-classed/react";
import {
  InputBase,
  InputWrapper,
  InputWrapperProps,
} from "@/components/inputs/Input";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const TextareaBase = classed.textarea("!py-2 !px-3", InputBase);

const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea"> & InputWrapperProps
>(({ label, containerClassName, rows = 4, field, ...props }, ref) => {
  const error =
    field?.state.meta.isTouched && field?.state.meta.errors.length
      ? field?.state.meta.errors.join(", ")
      : "";

  return (
    <InputWrapper
      label={label}
      containerClassName={containerClassName}
      error={error}
    >
      <TextareaBase ref={ref} {...props} rows={rows} withError={!!error} />
    </InputWrapper>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
