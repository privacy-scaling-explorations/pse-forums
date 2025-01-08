import { Link } from "@tanstack/react-router"
import { Avatar } from "c/Avatar"
import type { FC } from "react"
import { Button } from "ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "ui/card"
import { Separator } from "ui/separator"

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
]

export const Groups: FC = () => (
  <Card className="bg-gray-50">
    <CardHeader>
      <CardTitle className="self-start text-xs">EXPLORE GROUPS</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {groups.map(({ name, id: iid }, i) => (
          <div key={iid}>
            <div key={iid} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Avatar />
                <span className="font-bold">{name}</span>
              </div>
              <Link to={`/group/${iid}`}>
                <Button variant="outline" size="sm">
                  Join
                </Button>
              </Link>
            </div>
            {i < groups.length - 1 && <Separator className="mt-2" />}
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="ghost" size="sm">
        Show more
      </Button>
    </CardFooter>
  </Card>
)
