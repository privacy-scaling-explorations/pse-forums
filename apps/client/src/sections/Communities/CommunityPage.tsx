import { PageContent } from "@/components/PageContent";
import { Button } from "@/components/ui/Button";
import { useParams, Link } from "@tanstack/react-router";
import {
  UserPlusIcon,
  PlusIcon,
  PencilLine as PencilIcon,
  FileBadge as FileBadgeIcon,
  Check as CheckIcon,
} from "lucide-react";
import { PostAuthor } from "../Post/PostAuthor";
import { PostCard } from "../Post/PostCard";
import { Badge } from "@/components/ui/Badge";
import { Avatar } from "@/components/Avatar";
import { useGetPosts } from "@/hooks/usePosts";
import { useGetCommunityById } from "@/hooks/useCommunities";
import { formatDate } from "@/lib/utils";
import { InfoCard } from "@/components/ui/InfoCard";
import { useGetBadges } from "@/hooks/useBadges";
import { useGetUser } from "@/hooks/useAuth";
export const CommunityPage = () => {
  const communityParams = useParams({ from: "/_left-sidebar/communities/$id" });

  const communityId = communityParams.id;

  const { data: community } = useGetCommunityById(communityId);
  const { data: badges } = useGetBadges();
  const { data: user } = useGetUser();
  const { data: posts } = useGetPosts();

  if (!community) {
    return <div>Community not found {`${communityId}`}</div>;
  }

  return (
    <PageContent className="!pt-0 !px-0 lg:!pb-4 lg:!px-4">
      <div className="flex flex-col">
        <div className="h-[200px] w-full bg-base-muted-foreground px-4"></div>
        <div className="relative flex flex-col bg-base-background gap-6 -mt-4 rounded-t-[24px] p-4 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex w-full gap-10">
              <div className="flex gap-3 w-full items-center">
                <Avatar src={community.logo} className="!size-[78px]" />
                <div className="flex flex-col gap-1">
                  <span className="text-base-muted-foreground font-inter font-medium text-xs uppercase">
                    community
                  </span>
                  <h1 className="text-card-foreground font-inter font-semibold text-xl leading-5 line-clamp-1">
                    {community.name}
                  </h1>
                </div>
              </div>
              <div className="ml-auto flex gap-2.5  align-baseline">
                <Button size="sm" icon={UserPlusIcon} variant="outline">
                  Join
                </Button>
                <Link
                  to="/post/create"
                  search={{ community: Number(community.id) }}
                >
                  <Button size="sm" icon={PlusIcon}>
                    New Post
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <span className="text-base-muted-foreground font-inter font-normal text-sm">
                  {community.description}
                </span>
                <div className="flex items-center gap-2">
                  <PencilIcon className="size-4 text-base-muted-foreground" />
                  <span className="text-base-muted-foreground font-inter font-normal text-sm">
                    Created {formatDate(community.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex gap-6">
                <InfoCard
                  label="Members"
                  value={community?.members?.length || 0}
                  variant="base"
                  fontSize="lg"
                />
                <InfoCard
                  label="Posts"
                  value={posts?.length || 0}
                  variant="base"
                  fontSize="lg"
                />
              </div>
              <div className="flex flex-col gap-2.5 pb-8 border-b border-base-border">
                <div className="flex gap-1 items-center">
                  <FileBadgeIcon className="size-4 text-base-muted-foreground" />
                  <span className="font-semibold  text-base-muted-foreground text-xs uppercase">
                    To join this community, you must have ONE OF THE following
                    badge(s)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {community?.requiredBadges?.map((id: any) => {
                    const badge = badges?.find(
                      (badge: any) => Number(badge?.id) === Number(id),
                    );
                    const userHasBadge = user?.badges
                      .map((badge: any) => +badge?.id)
                      ?.includes(+badge?.id);
                    return (
                      <div key={badge?.id} className="flex items-center gap-1">
                        {userHasBadge && (
                          <CheckIcon className="size-4 text-chart-1" />
                        )}
                        <Badge
                          variant={userHasBadge ? "success" : "secondary"}
                          rounded="md"
                        >
                          {badge?.name}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            {posts?.map((post, index) => {
              return (
                <div className="flex flex-col gap-14">
                  <PostCard
                    className="relative"
                    key={index}
                    title={post.title}
                    postId={post.id}
                    withHover
                  >
                    <PostAuthor
                      author={post.author}
                      createdAt={post.createdAt}
                    />
                    <div className=" flex items-center gap-2">
                      <Badge variant="secondary">
                        {post.communityData?.name}
                      </Badge>
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
