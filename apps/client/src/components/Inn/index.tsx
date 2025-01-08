import { Route } from "routes/group/$iid"
import type { PageInn } from "./types"

export const Inn = () => {
  const inn: PageInn = Route.useLoaderData()

  return (
    <div className="h-screen">
      <h2>Fetched group data</h2>
      <pre
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          height: "600px",
          fontSize: "12px",
        }}
      >
        {JSON.stringify(inn, null, 2)}
      </pre>
    </div>
  )
}
