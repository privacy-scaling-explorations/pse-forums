import { createClient, FetchTransport } from "@rspc/client"
import { createReactQueryHooks } from "@rspc/react-query"
import type { Procedures } from "./bindings"

export const {
  Provider: RspcProvider,
  useQuery,
  useMutation,
} = createReactQueryHooks<Procedures>()

const jwt = "fake_jwt";

export const rspc = createClient<Procedures>({
  transport: new FetchTransport(
    "http://localhost:3000/rspc",
    (input, init) => fetch(input, {
      ...init,
      credentials: "include",
      headers: {
        ...init?.headers,
        "Authorization": `Bearer ${jwt}`
      }
    })
  ),
})
