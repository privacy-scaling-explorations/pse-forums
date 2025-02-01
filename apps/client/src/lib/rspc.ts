import { createClient, FetchTransport } from "@rspc/client"
import { createReactQueryHooks } from "@rspc/react-query"
import { getAuth } from "p/AuthProvider"
import type { Procedures } from "./bindings"

export const {
  Provider: RspcProvider,
  useQuery,
  useMutation,
} = createReactQueryHooks<Procedures>()

export const rspc = createClient<Procedures>({
  transport: new FetchTransport(
    "http://localhost:3000/rspc",
    (input, init) => {
      const auth = getAuth()
      const authHeader = {
        Authorization: `Bearer ${auth?.token}`,
      }

      return fetch(input, {
        ...init,
        credentials: auth ? "include" : undefined,
        headers: {
          ...init?.headers,
          ...(auth && authHeader),
        },
      })
    },
  ),
})
