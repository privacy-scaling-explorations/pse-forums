import { createClient, FetchTransport } from "@rspc/client"
import { createReactQueryHooks } from "@rspc/react-query"
import type { Procedures } from "./bindings"

export const {
  Provider: RspcProvider,
  useQuery,
  useMutation,
} = createReactQueryHooks<Procedures>()

export const rspc = createClient<Procedures>({
  transport: new FetchTransport("http://localhost:3000/rspc"),
})
