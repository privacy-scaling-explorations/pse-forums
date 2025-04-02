import { Avatar } from "@/components/Avatar";
import { Card } from "@/components/cards/Card";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useGetCommunities } from "@/hooks/useCommunities";
import { CommunitySchema } from "@/shared/schemas/community.schema";
export const Groups = () => {
  const [showAllGroups, setShowAllGroups] = useState(false);

  const { data: communities } = useGetCommunities();

  const displayedGroups = showAllGroups
    ? communities
    : communities?.slice(0, 3);

  return (
    <Card.Base
      className="flex flex-col gap-6 bg-sidebar-background border border-sidebar-border"
      spacing="md"
    >
      <Card.Title className="self-start text-xs">
        EXPLORE COMMUNITIES
      </Card.Title>
      <div className="divide-y divide-sidebar-border">
        {displayedGroups?.map(({ name, id: iid, avatar }: CommunitySchema) => (
          <div key={iid}>
            <div key={iid} className="flex items-center justify-between py-3">
              <Link to={`/communities/${iid}` as any} className="flex items-center gap-2">
                <Avatar src={avatar} />
                <span className="font-semibold font-inter text-base-primary line-clamp-1">
                  {name}
                </span>
                </Link>
            </div>
          </div>
        ))}
      </div>
      <button
        className="!text-xs text-left text-base-muted-foreground"
        onClick={() => setShowAllGroups(!showAllGroups)}
      >
        {showAllGroups ? "Show less" : "Show more"}
      </button>
    </Card.Base>
  );
};
