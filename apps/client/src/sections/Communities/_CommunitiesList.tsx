import { Avatar } from "@/components/Avatar";
import { Card } from "@/components/cards/Card";
import { useGetCommunities } from "@/hooks/useCommunities";
import { useGetUser } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";

interface CommunitiesListProps {
  view?: "all" | "joined";
}

export const CommunitiesList = ({ view = "all" }: CommunitiesListProps) => {
  const { data: communities = [] } = useGetCommunities();
  const { data: user } = useGetUser();

  const joinedCommunities =
    user?.id == undefined
      ? []
      : communities?.filter((community: any) =>
          community?.members?.some((member: any) => member === user?.id),
        );

  const filteredCommunities = view === "all" ? communities : joinedCommunities;
  if (filteredCommunities.length === 0) {
    return <div>No communities found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {filteredCommunities?.map((community: any) => (
        <Link key={community.id} to={`/communities/${community.id}` as any}>
          <Card.Base key={community.id} withHover>
            <div className="flex gap-3 items-center">
              <Avatar className="!size-[50px]" src={community.avatar} />
              <div className="flex flex-col">
                <h3 className="text-base lg:text-lg font-semibold text-card-foreground font-inter">
                  {community.name}
                </h3>
                <span className=" text-base-muted-foreground text-xs font-medium line-clamp-1">
                  {community.description}
                </span>
              </div>
            </div>
          </Card.Base>
        </Link>
      ))}
    </div>
  );
};
