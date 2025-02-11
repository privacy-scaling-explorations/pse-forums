import { createFileRoute } from "@tanstack/react-router"
import { Group as component } from "c/Group"
import { rspc } from "l/rspc"

export const Route = createFileRoute("/group/$gid")({
  component,
  loader: async ({ params: { gid } }) => rspc.query(["group.read", Number.parseInt(gid)]),
})
