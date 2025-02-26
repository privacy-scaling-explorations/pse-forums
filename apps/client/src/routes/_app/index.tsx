import { createFileRoute } from "@tanstack/react-router";
import { PostCard } from "c/Post/PostCard";
import { PostAuthor } from "c/Post/PostAuthor";
import { postMocks } from "mocks/postMocks";
import { Button } from "c/ui/button";
import { Plus as PlusIcon } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: HomePageView,
});

function HomePageView() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full justify-between">
        <div></div>
        <Link to="/post/create">
          <Button icon={PlusIcon}>New Post</Button> 
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {postMocks?.map((post, index) => {
          return (
            <div className="flex flex-col gap-14">
              <PostCard
                key={index}
                title={post.title}
                postId={post.id}
                withHover
              >
                <PostAuthor
                  username={post.author}
                  group="PSE"
                  createdAt={post.createdAt}
                />
              </PostCard>
            </div>
          );
        })}
      </div>
    </div>
  );
}
