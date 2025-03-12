import { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
}) => {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center justify-center text-center gap-2.5 max-w-[310px] m-auto">
      {Icon && <Icon className="size-6 text-base-primary" />}
      <h2 className="text-sm font-medium text-base-primary font-inter">{title}</h2>
      {description && (
        <span className="text-xs text-base-muted-foreground font-inter">{description}</span>
      )}
    </div>
  );
};

export default EmptyState;
