import { Avatar } from "@/components/Avatar";
import { TimeSince } from "@/components/ui/TimeSince";
import {
  PostAuthorSchema,
  PostBadgeSchema,
} from "@/shared/schemas/post.schema";
import { VenetianMask as Mask } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Mail as MailIcon } from "lucide-react";
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
      {author?.username && !author.isAnon && (
        <Link to={`/user/${author.username}` as any}>
          <span className="text-card-foreground font-inter font-medium text-sm line-clamp-2 lg:line-clamp-1 hover:underline">
            {author.username}
          </span>
        </Link>
      )}
      {badges?.length > 0 && (
        <>
          <span>·</span>
          {badges?.map((badge: PostBadgeSchema) => (
            <div
              className="flex gap-1 items-center bg-sidebar-background px-[10px] py-0.5 rounded-xl border border-base-border"
              key={badge.id}
            >
              <MailIcon className="size-2.5 text-base-muted-foreground" />
              <span className="text-sm font-inter font-medium text-base-foreground">
                {badge?.name}
              </span>
            </div>
          ))}
        </>
      )}
      {createdAt && <TimeSince isoDateTime={createdAt} />}
    </div>
  );
};
