import { PageContent } from "@/components/PageContent";
import { Link, PlusIcon } from "lucide-react";
import { postMocks } from "mocks/postMocks";
import { PostAuthor } from "@/components/sections/Post/PostAuthor";
import { PostCard } from "@/components/sections/Post/PostCard";
import { Badge, Button } from "@/components/index";

export const HomePage = () => {
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
};
