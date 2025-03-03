import { createFileRoute } from "@tanstack/react-router";
import { PostCard } from "@/components/Post/PostCard";
import { PostAuthor } from "@/components/Post/PostAuthor";
import { postMocks } from "mocks/postMocks";
import { Button } from "@/components/ui/Button";
import { Plus as PlusIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/Badge";
import { PageContent } from "@/components/PageContent";

export const Route = createFileRoute("/_app/")({
  component: HomePageView,
});

function HomePageView() {
  return (
    <PageContent className="flex flex-col gap-6">
      <div className="flex w-full justify-between">
        <div></div>
        <Link to="/post/create">
          <Button icon={PlusIcon}>New Post</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {postMocks?.map((post, index) => {
          const hasComments = post.replies.length > 0;
          return (
            <div className="flex flex-col gap-14">
              <PostCard
                className="relative"
                key={index}
                title={post.title}
                postId={post.id}
                withHover
              >
                {hasComments && (
                  <PostCard.CommentCount
                    className="absolute right-[14px] top-1/2 -translate-y-1/2"
                    count={post.replies.length}
                  />
                )}
                <PostAuthor
                  username={post.author}
                  group="PSE"
                  createdAt={post.createdAt}
                />
                <div className=" flex items-center gap-2">
                  <Badge variant="white">{post.group}</Badge>
                </div>
              </PostCard>
            </div>
          );
        })}
      </div>
    </PageContent>
  );
}
