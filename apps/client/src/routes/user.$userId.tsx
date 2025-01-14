import { createFileRoute } from "@tanstack/react-router"
import { rspc } from "l/rspc"

export const Route = createFileRoute("/user/$userId")({
  component: RouteComponent,
})

function RouteComponent() {
  const { userId } = Route.useParams()
  const { data, isLoading, error } = rspc.useQuery([
    "users.read",
    Number(userId),
  ])
  console.log({ data, isLoading, error })
  return <div>Hello user {userId}!</div>
}
