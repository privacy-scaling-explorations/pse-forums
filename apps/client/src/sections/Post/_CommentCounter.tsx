import { MessageSquare } from "lucide-react"
import type { FC } from "react"

export const CommentCounter: FC<{ count: number }> = ({ count }) => {
  return (
    count > 1 && (
      <div className="border rounded-md px-3 py-1 inline-flex items-center gap-1">
        <MessageSquare />
        {count}
      </div>
    )
  )
}
