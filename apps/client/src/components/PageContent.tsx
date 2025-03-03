import { ReactNode } from "react";
import { Labels } from "./ui/Labels";
import { LucideIcon } from "lucide-react";
import EmptyState from "./ui/EmptyState";
import { cn } from "@/lib/utils";
interface PageContentProps {
  title?: string;
  children?: ReactNode;
  showEmptyState?: boolean;
  className?: string;
  emptyState?: {
    icon: LucideIcon;
    title: string;
    description?: string;
  };
}

export const PageContent = ({
  title,
  children,
  showEmptyState = false,
  emptyState,
  className,
}: PageContentProps) => {
  return (
    <div
      className={cn("flex flex-col gap-6 p-4 lg:p-6", className, {
        "h-full": showEmptyState,
      })}
    >
      {title && <Labels.PageTitle>{title}</Labels.PageTitle>}
      {children}
      {showEmptyState && emptyState && (
        <EmptyState
          icon={emptyState.icon}
          title={emptyState.title}
          description={emptyState.description}
        />
      )}
    </div>
  );
};
