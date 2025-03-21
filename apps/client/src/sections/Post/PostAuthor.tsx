import { Avatar } from "@/components/Avatar";
import { TimeSince } from "@/components/ui/TimeSince";
import { Users as UserGroupIcon } from "lucide-react";
import { ReactNode } from "react";

interface PostAuthorProps {
  username: string;
  createdAt?: string;
  titleSize?: "sm" | "lg";
  badges?: {
    label: string;
    icon: ReactNode;
  }[];
  avatarClassName?: string;
}

export const PostAuthor = ({
  username,
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
        username={username}
      />
      <span className="text-card-foreground font-inter font-medium text-sm line-clamp-2 lg:line-clamp-1">
        {username}
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
