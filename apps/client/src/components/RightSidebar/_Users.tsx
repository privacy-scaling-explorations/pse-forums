import { Link } from "@tanstack/react-router"
import { Avatar } from "c/Avatar"
import { Card, CardContent, CardHeader, CardTitle } from "c/ui/card"

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
]

export const Users = () => (
  <Card className="bg-gray-50">
    <CardHeader>
      <CardTitle className="self-start text-xs">ACTIVE USERS</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-6 gap-2">
        {users.map(({ userId, username }) => (
          <Link to={`/user/${userId}`} key={userId}>
            <Avatar username={username} />
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
)
