import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Content } from "@/components/Content";
import { useGetBadges, useGetPostById } from "@/hooks/usePosts";
import {
  Smile as SmileIcon,
  MessageSquare as MessageSquareIcon,
  Reply as ReplyIcon,
  Link as LinkIcon,
  User as UserGroupIcon,
} from "lucide-react";
import { PageContent } from "@/components/PageContent";
import { PostAuthor } from "@/sections/Post/PostAuthor";
import { PostCard } from "@/sections/Post/PostCard";
import { Tag } from "@/components/ui/Tag";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { PostReplyTextarea } from "@/components/post/PostReplyTextarea";
import { EmojiButton } from "@/components/ui/EmojiButton";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { TimeSince } from "@/components/ui/TimeSince";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/post/$postId")({
  component: PostPage,
  loader: async ({ params: { postId } }) => {
    return {
      postId: Number.parseInt(postId),
    };
  },
});

function PostPage() {
  const { postId } = useLoaderData({ from: "/_app/post/$postId" });
  const { user } = useGlobalContext();
  const [replyTo, setReplyTo] = useState<string | number | null>(null);
  const [mainReply, setMainReply] = useState<boolean>(false);
  const { data: postData } = useGetPostById(postId);
  const { data: badges } = useGetBadges();

  const form = useForm<any>();

  if (!postData) {
    return <div>Post not found</div>;
  }

  return (
    <PageContent className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <PostCard
          title={postData?.title ?? "Post not found"}
          size="lg"
          header={
            <div className="flex flex-col gap-4 pb-3">
              <div className="flex items-center gap-2 justify-between">
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="size-[14px] text-purple" />
                  <span className="text-purple font-inter font-semibold text-sm">
                    {postData.group}
                  </span>
                </div>
                <TimeSince isoDateTime={postData.createdAt} />
              </div>
              <PostAuthor
                author={postData.author}
                avatarClassName="!size-[30px]"
              />
            </div>
          }
        >
          <div className="flex flex-col gap-6">
            <Content content={postData.content} />
            <div className="flex items-center gap-2">
              <EmojiButton size="md" />
              <Tag tooltip="Comments">
                <MessageSquareIcon className="size-4" />
                <span>{postData.replies?.length ?? 0}</span>
              </Tag>
            </div>
          </div>
        </PostCard>
        <PostReplyTextarea
          placeholder="Add comment"
          rows={2}
          showFields={mainReply}
          isVisible
          onFocus={() => {
            setMainReply(true);
          }}
          onBlur={() => {
            setMainReply(false);
          }}
        />
      </div>
      <div className="flex flex-col gap-6">
        {postData.replies?.map((reply: any, index: number) => {
          const hasSubReplies = reply.replies?.length > 0;

          return (
            <div className="flex flex-col gap-5">
              <div className=" flex flex-col gap-2" key={index}>
                <PostAuthor
                  author={reply.author}
                  createdAt={reply.createdAt}
                  avatarClassName="!size-6 mr-1"
                />
                <div className="relative flex flex-col gap-6 ml-[30px]">
                  {hasSubReplies && (
                    <div className="absolute bottom-0 bg-[#E4E4E7] left-[-20px] top-0 w-[3px] h-full bg-gray-300 rounded-b-full"></div>
                  )}
                  <div className="text-base-foreground text-sm font-inter font-normal">
                    <Content content={reply.content} />
                  </div>
                  <div className="flex items-center gap-2">
                    <EmojiButton size="md" />
                    <Tag
                      tooltip="Reply"
                      onClick={() => {
                        setReplyTo(reply.id);
                      }}
                    >
                      <ReplyIcon className="size-4 text-black" />
                    </Tag>
                    <Tag tooltip="Copy link">
                      <LinkIcon className="size-4 text-black" />
                    </Tag>
                  </div>
                  <PostReplyTextarea
                    postId={postId}
                    author={reply.author}
                    isVisible={replyTo === reply.id}
                    showFields
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 ml-10 relative">
                {reply?.replies?.map((replyChildren: any, index: number) => {
                  return (
                    <div className="flex flex-col gap-2" key={index}>
                      <PostAuthor
                        author={replyChildren.author}
                        createdAt={replyChildren.createdAt}
                        avatarClassName="!size-6 mr-1"
                      />
                      <div
                        className={cn(
                          "flex flex-col gap-6 ml-[30px]",
                          hasSubReplies ? "" : "",
                        )}
                      >
                        <div className="text-base-foreground">
                          <Content content={replyChildren.content} />
                        </div>
                        <div className="flex items-center gap-2">
                          <EmojiButton size="md" />
                          <Tag
                            tooltip="Reply"
                            onClick={() => {
                              setReplyTo(replyChildren.id);
                            }}
                          >
                            <ReplyIcon className="size-4 text-black" />
                          </Tag>
                          <Tag tooltip="Copy link">
                            <LinkIcon className="size-4 text-black" />
                          </Tag>
                        </div>
                        <PostReplyTextarea
                          postId={postId}
                          author={replyChildren.author}
                          isVisible={replyTo === replyChildren.id}
                          showFields
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </PageContent>
  );
}
