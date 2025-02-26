import { ReactNode } from "react";
import { Card } from "../cards/Card";
import { classed, VariantProps } from "@tw-classed/react";
import { Link } from "@tanstack/react-router";
import { Eye as EyeIcon } from "lucide-react";


export interface PostCardProps extends VariantProps<typeof Card> {
  header?: ReactNode;
  title?: string;
  children?: ReactNode;
  size?: "sm" | "lg";
  withLink?: boolean;
  postId?: string | number;
}

const PostCardBase = classed(Card, {
  defaultVariants: {
    gap: "2.5",
    spacing: "sm",
  },
});

const PostTitle = classed.span(
  "text-black font-inter line-clamp-2 lg:line-clamp-1",
  {
    variants: {
      size: {
        sm: "text-lg leading-[28px] font-semibold",
        lg: "text-[30px] leading-[36px] font-bold",
      },
    },
    defaultVariants: {
      size: "sm",
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
}: PostCardProps) => {
  return (
    <PostCardBase withHover={withHover}>
      {header && <div className="flex flex-col gap-2">{header}</div>}
      {title &&
        (withLink && postId ? (
          <Link to="/post/$postId" params={{ postId: postId.toString() }}>
            <PostTitle size={size}>{title}</PostTitle>
          </Link>
        ) : (
          <PostTitle size={size}>{title}</PostTitle>
        ))}
      {children}
    </PostCardBase>
  );
};

const PostTotalView = ({ totalViews }: { totalViews: number }) => {
  return (
    <div className="flex items-center gap-1 ">
      <EyeIcon className="size-[18px] text-black" />
      <span className="text-sm font-inter font-medium text-[#71717A]">
        {totalViews}
      </span>
    </div>
  );
};

PostCard.displayName = "PostCard";
PostCard.TotalViews = PostTotalView;
PostCard.Title = PostTitle;

export { PostCard };
