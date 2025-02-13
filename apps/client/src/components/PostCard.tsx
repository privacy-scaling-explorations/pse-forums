import { Link } from "@tanstack/react-router"
import { Avatar } from "c/Avatar"
import type { PostDto } from "l/bindings"
import type { FC } from "react"
import { Card } from "ui/card"
import { Badge } from "./ui/badge"
import { TimeSince } from "./ui/time-since"

export const PostCard: FC<PostDto> = ({ id, title, createdAt, group }) => {
  return (
    <Card>
      <Link to="/post/$pid" params={{ pid: `${id}` }}>
        <div className="flex items-start bg-white p-3 rounded shadow">
          {/* Replace this with actual image when available */}
          <Avatar
            src="https://avatars.githubusercontent.com/u/38692952?s=400&u=5c6e6add3e7fbdb1e23179b3cb3c93540a5a9f9e&v=4"
            username={"usr"}
          />

          <div className="flex-grow flex flex-col items-start">
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <div className="flex space-x-2">
              <Badge variant="secondary">{group[1]}</Badge>
              <TimeSince
                className="text-sm text-gray-600"
                isoDateTime={createdAt}
              />
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
