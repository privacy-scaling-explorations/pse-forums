import { createFileRoute } from "@tanstack/react-router"
import { Inn } from "components/Inn"

export const Route = createFileRoute("/inn/$iid")({
  loader: async ({ params: { iid } }) =>
    fetch(`http://localhost:8080/api/v1/inn/${iid}.json`).then((res) => res.json()),
  component: Inn,
  // errorComponent: TODO,
  // notFoundComponent: TODO,
})
