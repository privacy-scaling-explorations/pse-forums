import { cn } from "@/lib/utils";
import { Tag } from "./Tag";

export const PostReactions = ({
  reactions,
  onToggleReaction,
  size = "sm",
  className,
}: {
  reactions: Record<string, any>;
  onToggleReaction: (emoji: string) => Promise<void>;
  size?: "sm" | "md";
  className?: string;
}) => {
  return (
    <div className={cn("flex gap-2", className)}>
      {Object.entries(reactions ?? {}).map(([emoji, reaction]) => {
        if (reaction.count === 0) return null;
        return (
          <Tag
            size={size}
            key={emoji}
            onClick={() => onToggleReaction?.(emoji)}
          >
            <span>{reaction.count}</span>
            <span>{emoji}</span>
          </Tag>
        );
      })}
    </div>
  );
};
