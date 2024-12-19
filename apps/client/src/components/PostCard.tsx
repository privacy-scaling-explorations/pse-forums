import type { FC } from "react"
import type { OutPostList } from "./Inn/types"

export const PostCard: FC<
  Pick<OutPostList, "created_at" | "inn_name" | "title" | "username">
> = ({ created_at, inn_name, title, username }) => (
  <div className="flex items-start bg-white p-3 rounded shadow">
    <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 flex-shrink-0">
      {/* Replace this with actual image when available */}
      {username[0].toLocaleUpperCase()}
    </div>

    <div className="flex-grow flex flex-col items-start">
      <h3 className="font-bold text-lg mb-1">{title}</h3>
      <div className="text-sm text-gray-600">
        {inn_name} • {created_at}
      </div>
    </div>
  </div>
)
