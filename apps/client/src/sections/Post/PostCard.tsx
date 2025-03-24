import { ReactNode } from "react";
import { classed, VariantProps } from "@tw-classed/react";
import { Link } from "@tanstack/react-router";
import { Eye as EyeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { MessageSquare as MessageSquareIcon } from "lucide-react";
import { Card } from "@/components/cards/Card";

export interface PostCardProps extends VariantProps<typeof Card.Base> {
  header?: ReactNode;
  title?: string;
  children?: ReactNode;
  size?: "sm" | "lg";
  withLink?: boolean;
  postId?: string | number;
  className?: string;
  withHover?: boolean;
  content?: string;
  clampTitle?: boolean;
}

const PostCardBase = classed(Card.Base, {
  defaultVariants: {
    gap: "2.5",
    spacing: "sm",
  },
});

const PostCommentCount = ({
  count,
  className,
}: {
  count: number;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "px-[6px] py-1 items-center gap-1 bg-base-primary rounded-full inline-flex ",
        className,
      )}
    >
      <MessageSquareIcon className="size-3 text-base-primary-foreground" />
      <span className="text-xs font-inter font-semibold text-base-primary-foreground">
        {count}
      </span>
    </div>
  );
};
const PostTitle = classed.span(
  "text-card-foreground font-inter  lg:w-full w-[90%]",
  {
    variants: {
      size: {
        sm: "text-lg leading-[28px] font-semibold",
        lg: "text-[30px] leading-[36px] font-bold",
      },
      clampTitle: {
        true: "line-clamp-2 lg:line-clamp-1",
        false: "l",
      },
    },
    defaultVariants: {
      size: "sm",
      clampTitle: true,
    },
  },
);

const PostCard = ({
  title,
  header,
  children,
  size = "sm",
  withLink = true,
  postId,
  withHover = false,
  className,
  content = "",
  clampTitle = true,
}: PostCardProps) => {
  return (
    <PostCardBase
      withHover={withHover}
      className={cn(
        {
          group: withHover,
        },
        className,
      )}
    >
      {(header || title) && (
        <div className="flex flex-col gap-1">
          {header && <div className="flex flex-col gap-1">{header}</div>}
          {title &&
            (withLink && postId ? (
              <Link to="/posts/$postId" params={{ postId: postId.toString() }}>
                <PostTitle size={size} clampTitle={clampTitle}>
                  {title}
                </PostTitle>
              </Link>
            ) : (
              <PostTitle size={size} clampTitle={clampTitle}>
                {title}
              </PostTitle>
            ))}
          {content?.length > 0 && (
            <span className="text-sm font-inter font-normal text-base-foreground line-clamp-3">
              {content}
            </span>
          )}
        </div>
      )}
      {children}
    </PostCardBase>
  );
};

const PostTotalView = ({ totalViews }: { totalViews: number }) => {
  return (
    <div className="flex items-center gap-1 ">
      <EyeIcon className="size-[18px] text-base-foreground" />
      <span className="text-sm font-inter font-medium text-base-muted-foreground">
        {totalViews}
      </span>
    </div>
  );
};

PostCard.displayName = "PostCard";
PostCard.TotalViews = PostTotalView;
PostCard.Title = PostTitle;
PostCard.CommentCount = PostCommentCount;

export { PostCard };
