import { Avatar } from "@/components/Avatar";
import { TimeSince } from "@/components/ui/TimeSince";
import { AuthorSchema } from "@/shared/schemas/post";
import { ReactNode } from "react";

interface PostAuthorProps {
  author: AuthorSchema;
  createdAt?: string;
  titleSize?: "sm" | "lg";
  badges?: {
    label: string;
    icon: ReactNode;
  }[];
  avatarClassName?: string;
}

export const PostAuthor = ({
  author,
  createdAt,
  avatarClassName,
  badges = [],
}: PostAuthorProps) => {
  return (
    <div className="flex gap-1 items-center">
      <Avatar
        size="sm"
        hasRandomBackground
        className={avatarClassName}
        username={author.username}
      />
      <span className="text-card-foreground font-inter font-medium text-sm line-clamp-2 lg:line-clamp-1">
        {author.username}
      </span>
      {badges?.length > 0 && (
        <>
          {badges.map((badge) => (
            <span key={badge.label}>{badge.icon}</span>
          ))}
          <span>·</span>
        </>
      )}
      {createdAt && <TimeSince isoDateTime={createdAt} />}
    </div>
  );
};
