import { Link } from "@tanstack/react-router";
import { Avatar } from "@/components/Avatar";
import { Card } from "@/components/cards/Card";

const users = [
  {
    username: "a",
    userId: 1,
  },
  {
    username: "b",
    userId: 2,
  },
  {
    username: "c",
    userId: 3,
  },
  {
    username: "d",
    userId: 4,
  },
  {
    username: "e",
    userId: 5,
  },
  {
    username: "f",
    userId: 6,
  },
  {
    username: "g",
    userId: 7,
  },
  {
    username: "h",
    userId: 8,
  },
  {
    username: "i",
    userId: 9,
  },
  {
    username: "j",
    userId: 10,
  },
  {
    username: "k",
    userId: 11,
  },
  {
    username: "l",
    userId: 12,
  },
  {
    username: "m",
    userId: 13,
  },
  {
    username: "n",
    userId: 14,
  },
  {
    username: "o",
    userId: 15,
  },
  {
    username: "p",
    userId: 16,
  },
];

export const Users = () => (
  <Card.Base className="bg-sidebar-background border border-sidebar-border" rounded="md">
    <Card.Title className="self-start text-xs">ACTIVE USERS</Card.Title>
    <div className="grid grid-cols-4 gap-2 ">
      {users.map(({ userId, username }) => (
        <Link to={`/user/${userId}` as any} key={userId}>
          <Avatar username={username} className="w-full aspect-square size-10" />
        </Link>
      ))}
    </div>
  </Card.Base>
);
