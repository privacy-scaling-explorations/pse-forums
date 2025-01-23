import type { RecommendUser } from "components/Inn/types"
import type { FC } from "react"

export const ActiveUsersList: FC<{ users: RecommendUser[] }> = ({ users }) => (
  <div>
    <h3 className="font-medium mb-2">Active Users</h3>
    <div className="flex flex-wrap">
      {users.map((user) => (
        <div
          key={user.uid}
          className="w-6 h-6 bg-gray-200 rounded-full mr-1 mb-1"
        />
      ))}
    </div>
  </div>
)
