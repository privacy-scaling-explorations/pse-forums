
import { classed } from "@tw-classed/react";
import { InputBase, InputWrapper, InputWrapperProps } from "@/components/inputs/Input";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const TextareaBase = classed.textarea("!py-2 !px-3", InputBase);

const Textarea = forwardRef<
  HTMLTextAreaElement,
  ComponentPropsWithoutRef<"textarea"> & InputWrapperProps
>(({ label, containerClassName, rows = 4, ...props }, ref) => {
  return (
    <InputWrapper label={label} containerClassName={containerClassName}>
      <TextareaBase ref={ref} {...props} rows={rows} />
    </InputWrapper>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
