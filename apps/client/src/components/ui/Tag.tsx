import { classed } from "@tw-classed/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/Tooltip";

const TagBase = classed.div(
  "flex items-center border text-sm rounded-md leading-[16px] duration-200 font-inter font-medium focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "border-base-input bg-base-background text-base-foreground",
      },
      size: {
        sm: "py-1 px-[6px] gap-1",
        md: "px-2.5 py-2 gap-2",
      },
      cursor: {
        pointer: "cursor-pointer",
        default: "cursor-default",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      cursor: "pointer",
    },
  },
);
export interface TagProps extends React.ComponentProps<typeof TagBase> {
  onRemove?: () => void;
  tooltip?: string;
}

const Tag = ({ className, onRemove, tooltip = "", ...props }: TagProps) => {
  return (
    <Tooltip content={tooltip}>
      <TagBase {...props} className={cn(className)}>
        {props.children}
        {onRemove && (
          <X className="size-4 opacity-50 cursor-pointer" onClick={onRemove} />
        )}
      </TagBase>
    </Tooltip>
  );
};
Tag.displayName = "Tag";
export { Tag };
