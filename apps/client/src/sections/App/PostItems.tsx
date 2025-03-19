import { useGetPosts } from "@/hooks/usePosts";
import { TimeSince } from "@/components/ui/TimeSince";
import {  MessageSquareIcon } from "lucide-react";
import { PostAuthor } from "../Post/PostAuthor";
import { PostCard } from "../Post/PostCard";
import { User as UserGroupIcon } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

export const PostItems = () => {
  const { data: posts = [], isLoading } = useGetPosts();

  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post, index) => {
        return (
          <div className="flex flex-col gap-14">
            <PostCard
              className="relative"
              header={
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="size-[14px] text-purple" />
                    <span className="text-purple font-inter font-semibold text-sm">
                      {post.group}
                    </span>
                  </div>
                  <TimeSince isoDateTime={post?.createdAt ?? ""} />
                </div>
              }
              key={index}
              title={post.title}
              postId={post.id}
              withHover
            >
              <PostAuthor author={post.author} />
              <div className=" flex items-center gap-2">
                <Tag size="sm">
                  <MessageSquareIcon className="size-4" />
                  <span>{post.replies.length}</span>
                </Tag>
              </div>
            </PostCard>
          </div>
        );
      })}
    </div>
  );
};
