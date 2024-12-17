import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/inn/")({
  component: InnIndex,
})

function InnIndex() {
  return <div>InnIndex</div>
}
