import { Groups } from "./_Groups"
import { Users } from "./_Users"

export function RightSidebar() {
  return (
    <aside className="w-[280px] space-y-4 text-xs">
      <Groups />
      <Users />
    </aside>
  )
}
