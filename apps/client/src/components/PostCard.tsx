import { Link } from "@tanstack/react-router"
import { Avatar } from "c/Avatar"
import type { PostDto } from "l/bindings"
import type { FC } from "react"
import { Card } from "ui/card"
import { Badge } from "./ui/badge"

export const PostCard: FC<
  PostDto & { group_name: string }
> = ({ id, title, created_at, group_name }) => {
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
              <Badge variant="secondary">{group_name}</Badge>
              <span className="text-sm text-gray-600">{created_at}</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}
