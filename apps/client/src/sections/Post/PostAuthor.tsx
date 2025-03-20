import { Avatar } from "@/components/Avatar";
import { TimeSince } from "@/components/ui/TimeSince";
import { PostAuthorSchema, PostBadgeSchema } from "@/shared/schemas/post.schema";
import { VenetianMask as Mask } from "lucide-react";
import { cn } from "@/lib/utils";

interface PostAuthorProps {
  author: PostAuthorSchema;
  createdAt?: string;
  titleSize?: "sm" | "lg";
  avatarClassName?: string;
  className?: string;
  badges?: PostBadgeSchema[];
}

export const PostAuthor = ({
  author,
  createdAt,
  avatarClassName,
  className = "",
  badges = [],
}: PostAuthorProps) => {
  return (
    <div className={cn("flex gap-1 items-center", className)}>
      <Avatar
        size="sm"
        hasRandomBackground={!author.isAnon}
        className={avatarClassName}
        username={author.isAnon ? null : author.username}
        icon={author.isAnon ? Mask : undefined}
      />
      {author?.username && (
        <span className="text-card-foreground font-inter font-medium text-sm line-clamp-2 lg:line-clamp-1">
          {author.username}
        </span>
      )}
      {badges?.length > 0 && (
        <>
          <span>·</span>
          {badges?.map((badge: PostBadgeSchema) => (
            <div
              className="flex gap-1 items-center bg-sidebar-background px-[10px] py-0.5 rounded-xl border border-base-border"
              key={badge.label}
            >
              {badge?.icon}
              <span className="text-xs font-inter font-medium text-base-foreground">
                {badge?.label}
              </span>
            </div>
          ))}
        </>
      )}
      {createdAt && <TimeSince isoDateTime={createdAt} />}
    </div>
  );
};
