import { ReactNode } from "react";
import { Labels } from "@/components/ui/Labels";
import { LucideIcon } from "lucide-react";
import EmptyState from "@/components/ui/EmptyState";
import { cn } from "@/lib/utils";

interface PageContentProps {
  title?: string;
  description?: string;
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
  description,
  children,
  showEmptyState = false,
  emptyState,
  className,
}: PageContentProps) => {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-4 lg:p-6 lg:max-w-[1200px] mx-auto",
        className,
        {
          "h-full": showEmptyState,
        },
      )}
    >
      <div className="flex flex-col gap-2">
        {title && <Labels.PageTitle className="">{title}</Labels.PageTitle>}
        {description && (
          <Labels.PageDescription className="">
            {description}
          </Labels.PageDescription>
        )}
      </div>
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
