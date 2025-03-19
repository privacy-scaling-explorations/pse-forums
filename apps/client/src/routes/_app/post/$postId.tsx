import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Content } from "@/components/Content";
import { useGetPostById } from "@/hooks/usePosts";
import {
  Smile as SmileIcon,
  MessageSquare as MessageSquareIcon,
  Reply as ReplyIcon,
  Link as LinkIcon,
  MailIcon,
  FileBadge,
} from "lucide-react";
import { PageContent } from "@/components/PageContent";
import { PostAuthor } from "@/sections/Post/PostAuthor";
import { PostCard } from "@/sections/Post/PostCard";
import { Tag } from "@/components/ui/Tag";
import { Textarea } from "@/components/inputs/Textarea";
import { useState } from "react";
import { useForm } from "@tanstack/react-form";
import { badgesMocks } from "mocks/badgesMocks";
import { Select } from "@/components/inputs/Select";
import { Switch } from "@/components/inputs/Switch";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { Button } from "@/components/ui/Button";
import { AuthWrapper } from "@/components/AuthWrapper";
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

  const { data: postData } = useGetPostById(postId);

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
            <div className="flex items-center justify-between">
              <PostAuthor
                author={postData.author}
                createdAt={postData.createdAt}
                avatarClassName="!size-[30px]"
              />
              <PostCard.TotalViews totalViews={postData?.totalViews ?? 0} />
            </div>
          }
        >
          <div className="space-y-6">
            <AuthWrapper>
              <Content content={postData.content} />
            </AuthWrapper>
            <div className="flex items-center gap-2">
              <AuthWrapper>
                <Tag tooltip="React">
                  <SmileIcon className="size-4" />
                </Tag>
              </AuthWrapper>
              <Tag tooltip="Comments">
                <MessageSquareIcon className="size-4" />
                <span>{postData.replies?.length ?? 0}</span>
              </Tag>
            </div>
          </div>
        </PostCard>
        <Textarea
          placeholder="Add comment"
          rows={1}
          onClick={() => {
            setReplyTo(null);
          }}
        />
      </div>
      <div className="flex flex-col gap-6">
        {postData?.replies?.map((reply: any, index: any) => {
          return (
            <div className="flex flex-col gap-2" key={index}>
              <PostAuthor
                author={reply.author}
                createdAt={reply.createdAt}
                avatarClassName="!size-6 mr-1"
              />
              <div className="flex flex-col gap-6 ml-[30px]">
                <div className="text-base-foreground">
                  <Content content={reply.content} />
                </div>
                <div className="flex items-center gap-2">
                  <AuthWrapper>
                    <Tag tooltip="React">
                      <SmileIcon className="size-4" />
                    </Tag>
                    <Tag
                      tooltip="Reply"
                      onClick={() => {
                        setReplyTo(reply.id);
                      }}
                    >
                      <ReplyIcon className="size-4 text-black" />
                    </Tag>
                  </AuthWrapper>
                  <Tag tooltip="Copy link">
                    <LinkIcon className="size-4 text-black" />
                  </Tag>
                </div>
                {replyTo === reply.id && (
                  <div className="ml-5 flex flex-col gap-4 border-l-[3px] border-base-border pl-5">
                    <Textarea placeholder="Add comment" />

                    <div className="flex justify-between">
                      <div className="lg:w-1/4">
                        <form.Field
                          name="tags"
                          children={(field) => (
                            <Select
                              header={
                                <div className="flex items-center gap-[6px] text-base-muted-foreground">
                                  <FileBadge className="size-[18px]" />
                                  <span className="text-base font-medium">
                                    Badges
                                  </span>
                                </div>
                              }
                              label="Add badges"
                              items={badgesMocks.map(({ id, name }) => ({
                                value: id,
                                label: (
                                  <div className="flex items-center gap-1">
                                    <MailIcon className="size-4" />
                                    <span>{name}</span>
                                  </div>
                                ),
                              }))}
                              onValueChange={(value) => {
                                const currentTags = field.state.value || [];
                                if (!currentTags.includes(value)) {
                                  field.handleChange([...currentTags, value]);
                                }
                              }}
                              field={field}
                            />
                          )}
                        />
                      </div>
                      <div className="ml-auto flex flex-col gap-4 justify-end">
                        <form.Field
                          name="postAsAnonymous"
                          children={(field) => (
                            <Switch
                              label="Post as anonymous?"
                              description={
                                field.state.value
                                  ? "Your name will not be displayed"
                                  : `You are posting as ${user?.name}`
                              }
                              checked={!!field.state.value}
                              onChange={(e) =>
                                field.handleChange(e.target.checked)
                              }
                              field={field}
                            />
                          )}
                        />
                        <form.Subscribe
                          selector={({ canSubmit, isSubmitting }) => [
                            canSubmit,
                            isSubmitting,
                          ]}
                          children={([_canSubmit, isSubmitting]) => (
                            <Button
                              aria-busy={isSubmitting}
                              disabled={isSubmitting}
                              className="min-w-[160px]"
                            >
                              Post
                            </Button>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PageContent>
  );
}
