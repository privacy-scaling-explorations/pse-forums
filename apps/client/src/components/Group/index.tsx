import type { GroupDto } from "l/bindings"
import { Route } from "r/group/$gid"

export function Group() {
  const group: GroupDto = Route.useLoaderData()

  return <span>{group.name}</span>
}
