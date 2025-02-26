import { Avatar } from "c/Avatar";
import { TimeSince } from "c/ui/time-since";
import { Users as UserGroupIcon } from "lucide-react";

interface PostAuthorProps {
  username: string;
  group?: string;
  createdAt?: string;
  titleSize?: "sm" | "lg";
  avatarClassName?: string;
}

export const PostAuthor = ({
  username,
  group,
  createdAt,
  avatarClassName,
}: PostAuthorProps) => {
  return (
    <div className="flex gap-1 items-center">
      <Avatar size="sm" hasRandomBackground avatarClassName={avatarClassName} />
      <span className="text-black font-inter font-medium text-sm line-clamp-2 lg:line-clamp-1">
        {username}
      </span>
      {group && (
        <>
          <span>·</span>
          <UserGroupIcon className="size-[14px] text-purple" />
          <span className="text-purple font-inter font-semibold text-sm">
            {group}
          </span>
        </>
      )}
      <span>·</span>
      {createdAt && <TimeSince isoDateTime={createdAt} />}
    </div>
  );
};
