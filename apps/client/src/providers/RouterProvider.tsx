import { RouterProvider as RouterProviderBase } from "@tanstack/react-router"
import { router } from "lib/router"

export function RouterProvider() {
  return <RouterProviderBase router={router} />
}
