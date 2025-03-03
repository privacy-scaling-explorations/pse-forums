import * as React from "react";

import { classed } from "@tw-classed/react";
import { InputBase, InputWrapper, InputWrapperProps } from "./Input";

const TextareaBase = classed.textarea("!py-2 !px-3", InputBase);

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & InputWrapperProps
>(({ label, containerClassName, rows = 4, ...props }, ref) => {
  return (
    <InputWrapper label={label} containerClassName={containerClassName}>
      <TextareaBase ref={ref} {...props} rows={rows} />
    </InputWrapper>
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
