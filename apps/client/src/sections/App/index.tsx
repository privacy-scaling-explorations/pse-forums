import { PageContent } from "@/components/PageContent";
import { PlusIcon } from "lucide-react";
import { postMocks } from "mocks/postMocks";
import { Button } from "@/components/ui/Button";
import { PostAuthor } from "@/sections/Post/PostAuthor";
import { PostCard } from "@/sections/Post/PostCard";
import { Link } from "@tanstack/react-router";
import { Users as UserGroupIcon } from "lucide-react";
import { TimeSince } from "@/components/ui/TimeSince";
import { AuthWrapper } from "@/components/AuthWrapper";
import { Tag } from "@/components/ui/Tag";
import { MessageSquare as MessageSquareIcon } from "lucide-react";

export const HomePage = () => {
  return (
    <PageContent className="flex flex-col gap-6">
      <AuthWrapper>
        <div className="flex w-full justify-between">
          <Link
            className="ml-auto"
            to="/post/create"
            search={{ community: undefined }}
          >
            <Button icon={PlusIcon}>New Post</Button>
          </Link>
        </div>
      </AuthWrapper>
      <div className="flex flex-col gap-4">
        {postMocks?.map((post, index) => {
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
                    <TimeSince isoDateTime={post.createdAt} />
                  </div>
                }
                key={index}
                title={post.title}
                postId={post.id}
                withHover
              >
                <PostAuthor username={post.author} />
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
    </PageContent>
  );
};
