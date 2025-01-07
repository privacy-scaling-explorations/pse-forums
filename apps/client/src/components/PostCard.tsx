import { Avatar, AvatarFallback } from "c/ui/avatar"
import { Card } from "c/ui/card"
import type { FC } from "react"
import type { OutPostList } from "./Inn/types"
import { Badge } from "./ui/badge"

export const PostCard: FC<
  Pick<OutPostList, "created_at" | "inn_name" | "title" | "username">
> = ({ created_at, inn_name, title, username }) => (
  <Card>
    <div className="flex items-start bg-white p-3 rounded shadow">
      <Avatar className="mr-2">
        {/* Replace this with actual image when available */}
        <AvatarFallback>{username[0].toLocaleUpperCase()}</AvatarFallback>
      </Avatar>

      <div className="flex-grow flex flex-col items-start">
        <h3 className="font-bold text-lg mb-1">{title}</h3>
        <div className="flex space-x-2">
          <Badge variant="secondary">{inn_name}</Badge>
          <span className="text-sm text-gray-600">{created_at}</span>
        </div>
      </div>
    </div>
  </Card>
)
