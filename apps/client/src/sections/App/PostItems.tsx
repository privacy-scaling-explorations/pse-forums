import { useGetPosts, useTogglePostReaction } from "@/hooks/usePosts";
import { TimeSince } from "@/components/ui/TimeSince";
import { MessageSquareIcon } from "lucide-react";
import { PostAuthor } from "../Post/PostAuthor";
import { PostCard } from "../Post/PostCard";
import { User as UserGroupIcon } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { EmojiButton } from "@/components/ui/EmojiButton";
import { usersMocks } from "../../../../shared/src/mocks/users.mocks";
import { PostReactions } from "@/components/ui/PostReactions";
import { Link } from "@tanstack/react-router";

export const PostItems = () => {
  const { data: posts = [], refetch: refetchPosts } = useGetPosts();
  const togglePostReaction = useTogglePostReaction();

  const onToggleReaction = async (postId: number | string, emoji: string) => {
    await togglePostReaction.mutateAsync({
      postId: postId.toString(),
      emoji,
      userId: usersMocks?.[0].id.toString(),
    });
    await refetchPosts();
  };

  return (
    <div className="flex flex-col gap-4">
      {posts?.map((post) => {
        return (
          <div key={post.id} className="flex flex-col gap-14 mx-auto w-full">
            <PostCard
              className="relative !gap-[14px]"
              header={
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-1">
                    <UserGroupIcon className="size-[14px] text-purple" />
                    <Link to={`/communities/${post.communityData?.id}` as any}>
                      <span className="text-purple font-inter font-semibold text-sm">
                        {post.communityData?.name}
                      </span>
                    </Link>
                  </div>
                  <TimeSince isoDateTime={post?.createdAt ?? ""} />
                </div>
              }
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
                    await onToggleReaction(post.id, emoji);
                  }}
                />

                <PostReactions
                  reactions={post.reactions ?? {}}
                  onToggleReaction={async (emoji) => {
                    await onToggleReaction(post.id, emoji);
                  }}
                />

              </div>
            </PostCard>
          </div>
        );
      })}
    </div>
  );
};
