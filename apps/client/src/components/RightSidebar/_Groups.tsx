import { Avatar } from "@/components/Avatar";
import type { FC } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { Link } from "@tanstack/react-router";
import { Separator } from "@/components/ui-old/Separator";
const groups = [
  {
    name: "Rust",
    id: 0,
  },
  {
    name: "Dev",
    id: 1,
  },
  {
    name: "PSE",
    id: 2,
  },
];

export const Groups: FC = () => (
  <Card.Base className="flex flex-col gap-6 bg-white-dark" spacing="md">
    <Card.Title className="self-start text-xs">EXPLORE GROUPS</Card.Title>
    <div className="space-y-2">
      {groups.map(({ name, id: iid }, i) => (
        <div key={iid}>
          <div key={iid} className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <Avatar />
              <span className="font-semibold font-inter text-black">{name}</span>
            </div>
            <Link to={`/group/${iid}` as any}>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </Link>
          </div>
          {i < groups.length - 1 && <Separator className="mt-2" />}
        </div>
      ))}
    </div>
    <Button variant="ghost" size="sm" className="!text-xs">
      Show more
    </Button>
  </Card.Base>
);
