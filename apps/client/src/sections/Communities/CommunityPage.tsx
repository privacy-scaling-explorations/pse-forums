import { PageContent } from "@/components/PageContent";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@radix-ui/react-avatar";
import { useParams } from "@tanstack/react-router";
import { UserPlusIcon, PlusIcon, Badge } from "lucide-react";
import { membershipMocks } from "mocks/membershipMocks";
import { postMocks } from "mocks/postMocks";
import { PostAuthor } from "../Post/PostAuthor";
import { PostCard } from "../Post/PostCard";
import { Tabs } from "@/components/ui/Tabs";

export const CommunityPage = () => {
    const communityParams = useParams({ from: "/_left-sidebar/communities/$id" });

    const communityId = communityParams.id;
  
    const community = membershipMocks.find(
      (community) => community.id?.toString() === communityId?.toString(),
    );
  
    if (!community) {
      return <div>Community not found {`${communityId}`}</div>;
    }
  
    return (
      <PageContent className="!pt-0 !px-0 lg:!pb-4 lg:!px-4">
        <div className="flex flex-col">
          <div className="h-[180px] w-full bg-white-light px-4">
            <Tabs
              className="w-full pt-4"
              defaultValue="all"
              items={[
                {
                  label: "All",
                  id: "all",
                },
                {
                  label: "My Community Posts",
                  id: "my-community-posts",
                },
                {
                  label: "Following",
                  id: "following",
                },
                {
                  label: community.name,
                  id: "my-posts",
                },
              ]}
            ></Tabs>
          </div>
          <div className="relative flex flex-col bg-white gap-6 -mt-4 overflow-hidden rounded-t-[24px] p-4 w-full">
            <div className="flex flex-col gap-4">
              <div className="flex w-full gap-4">
                <div className="flex gap-3 w-full">
                  <Avatar src={community.logo} className="!size-[78px]" />
                  <div className="flex flex-col gap-2.5">
                    <h1 className="text-black font-inter font-semibold text-xl leading-5 lg:max-w-[270px] line-clamp-2">
                      {community.name}
                    </h1>
                    <span className="text-black-secondary font-inter font-medium text-xs">
                      {community.members} members · {community.posts} posts
                    </span>
                  </div>
                </div>
                <div className="ml-auto flex gap-2.5  align-baseline">
                  <Button size="sm" icon={UserPlusIcon} variant="outline">
                    Join
                  </Button>
                  <Button size="sm" icon={PlusIcon}>
                    New Post
                  </Button>
                </div>
              </div>
              <span className="text-black-secondary font-inter font-normal text-sm">
                {community.description}
              </span>
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
          </div>
        </div>
      </PageContent>
    );
};
