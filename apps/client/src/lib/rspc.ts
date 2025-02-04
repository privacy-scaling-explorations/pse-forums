import { createClient, FetchTransport } from "@rspc/client"
import { createReactQueryHooks } from "@rspc/react-query"
import { AUTH_LOCAL_STORAGE_KEY, type AuthData } from "./auth"
import type { Procedures } from "./bindings"

export const {
  Provider: RspcProvider,
  useQuery,
  useMutation,
} = createReactQueryHooks<Procedures>()

const getToken = (): string | undefined => {
  const jsonStr = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!jsonStr) {
    return undefined
  }
  const { auth } = JSON.parse(jsonStr) as { auth: AuthData }
  return auth?.token
}

export const rspc = createClient<Procedures>({
  transport: new FetchTransport(
    "http://localhost:3000/rspc",
    (input, init) => {
      const token = getToken()

      const authHeader = {
        Authorization: `Bearer ${token}`,
      }

      return fetch(input, {
        ...init,
        credentials: token ? "include" : undefined,
        headers: {
          ...init?.headers,
          ...(token && authHeader),
        },
      })
    },
  ),
})
