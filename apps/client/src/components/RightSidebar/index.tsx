import { Groups } from "./_Groups"
import { Tools } from "./_Tools"
import { Users } from "./_Users"

export function RightSidebar() {
  return (
    <aside className="w-80 pl-4 space-y-4 text-xs mr-4">
      <Groups />
      <Tools />
      <Users />
    </aside>
  )
}
