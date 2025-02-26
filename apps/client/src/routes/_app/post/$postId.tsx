import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { PostAuthor } from "c/Post/PostAuthor";
import { PostCard } from "c/Post/PostCard";
import { useGetPostById } from "hooks/usePosts";
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
    <div className="flex flex-col gap-14">
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
      ></PostCard>
      <PostCard>
        <div className="flex flex-col gap-6">
          {postData.replies?.map((reply, index) => {
            return (
              <PostAuthor
                key={index}
                username={reply.author}
                createdAt={reply.createdAt}
                avatarClassName="!size-6 mr-1"
              />
            );
          })}
        </div>
      </PostCard>
    </div>
  );
}
