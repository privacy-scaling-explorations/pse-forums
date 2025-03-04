import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { Card } from "@/components/cards/Card";
import { Content } from "@/components/Content";
import { useGetPostById } from "@/hooks/usePosts";
import { Smile as SmileIcon, MessageSquare as MessageSquareIcon } from 'lucide-react';
import { PageContent } from "@/components/PageContent";
import { PostAuthor } from "@/components/sections/Post/PostAuthor";
import { PostCard } from "@/components/sections/Post/PostCard";



export const Route = createFileRoute("/_app/post/$postId")({
  component: PostPage,
  //loader: async ({ params: { postId } }) => rspc.query(["post.read", Number.parseInt(postId)]),
  loader: async ({ params: { postId } }) => {
    return {
      postId: Number.parseInt(postId),
    };
  },
});

function PostPage() {
  const { postId } = useLoaderData({ from: "/_app/post/$postId" });
  console.log(postId);

  const { data: postData } = useGetPostById(postId);

  if (!postData) {
    return <div>Post not found</div>;
  }

  return (
    <PageContent className="flex flex-col gap-14">
      <PostCard
        title={postData?.title ?? "Post not found"}
        size="lg"
        header={
          <div className="flex items-center justify-between">
            <PostAuthor
              username={postData.author}
              createdAt={postData.createdAt}
              group={postData?.group}
              avatarClassName="!size-[30px]"
            />
            <PostCard.TotalViews totalViews={postData?.totalViews ?? 0} />
          </div>
        }
      />
      <PostCard>
        <div className="flex flex-col gap-6">
          {postData.replies?.map((reply, index) => {
            return (
              <div className="flex flex-col gap-2" key={index}>
                <PostAuthor
                  username={reply.author}
                  createdAt={reply.createdAt}
                  avatarClassName="!size-6 mr-1"
                />
                <div className="flex flex-col gap-6 ml-[30px]">
                  <Content content={reply.content} />
                  <div className="flex items-center gap-2">
                    <Card.Base className=" align-start py-2 inline-flex w-auto" spacing="sm">
                      <SmileIcon className="size-4" />
                    </Card.Base>
                    <Card.Base className=" align-start py-2 inline-flex w-auto" spacing="sm">
                    <div className="flex items-center gap-1">
                      <MessageSquareIcon className="size-4 text-black" />
                      <span className="text-sm font-inter font-medium text-black leading-none">
                        0
                      </span>
                    </div>
                    </Card.Base>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </PostCard>
    </PageContent>
  );
}
