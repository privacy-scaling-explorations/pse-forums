import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/group/")({
  component: InnIndex,
})

function InnIndex() {
  return <div>InnIndex</div>
}
