import { Avatar } from "@/components/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { Link } from "@tanstack/react-router";
import { membershipMocks } from "mocks/membershipMocks";
import { useState } from "react";

export const Groups = () => {
  const [showAllGroups, setShowAllGroups] = useState(false);
  
  const displayedGroups = showAllGroups 
    ? membershipMocks 
    : membershipMocks.slice(0, 3);


  return (
    <Card.Base className="flex flex-col gap-6 bg-sidebar-background border border-sidebar-border" spacing="md">
      <Card.Title className="self-start text-xs">EXPLORE COMMUNITIES</Card.Title>
      <div className="divide-y divide-sidebar-border">
        {displayedGroups.map(({ name, id: iid }) => (
          <div key={iid}>
            <div key={iid} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-1">
                <Avatar />
                <span className="font-semibold font-inter text-base-primary line-clamp-1">{name}</span>
              </div>
              <Link to={`/group/${iid}` as any}>
                <Button size="sm">
                  Join
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
      <button 
        className="!text-xs text-left text-base-muted-foreground"
        onClick={() => setShowAllGroups(!showAllGroups)}
      >
        {showAllGroups ? 'Show less' : 'Show more'}
      </button>
    </Card.Base>
  );
};
