import { useGetPosts, useAddPostReaction } from "@/hooks/usePosts";
import { TimeSince } from "@/components/ui/TimeSince";
import { MessageSquareIcon } from "lucide-react";
import { PostAuthor } from "../Post/PostAuthor";
import { PostCard } from "../Post/PostCard";
import { User as UserGroupIcon } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { EmojiButton } from "@/components/ui/EmojiButton";

export const PostItems = () => {
  const { data: posts = [], refetch: refetchPosts } = useGetPosts();
  const addPostReaction = useAddPostReaction();

  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post, index) => {
        return (
          <div className="flex flex-col gap-14">
            <PostCard
              className="relative !gap-[14px]"
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
              content={post.content}
              postId={post.id}
              withHover
            >
              <PostAuthor
                author={post.author}
                badges={post.author.badges ?? []}
              />
              <div className=" flex items-center gap-2">
                <Tag size="sm">
                  <MessageSquareIcon className="size-4" />
                  <span>{post.replies.length}</span>
                </Tag>

                <EmojiButton
                  size="sm"
                  onClick={async (emoji) => {
                    await addPostReaction.mutateAsync({
                      postId: post.id,
                      emoji,
                    });
                    await refetchPosts();
                  }}
                />

                {Object.entries(post.reactions ?? {}).map(([emoji]) => (
                  <Tag size="sm">
                    <span>{emoji}</span>
                  </Tag>
                ))}
              </div>
            </PostCard>
          </div>
        );
      })}
    </div>
  );
};
