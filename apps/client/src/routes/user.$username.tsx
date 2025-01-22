import { createFileRoute } from "@tanstack/react-router"
import { useQuery } from "l/rspc"

export const Route = createFileRoute("/user/$username")({
  component: RouteComponent,
})

function RouteComponent() {
  const { username } = Route.useParams()
  const { data, isLoading, error } = useQuery(["profile.read", username])
  console.log({ data, isLoading, error })
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return <div>Hello user {data.username}!</div>
}
