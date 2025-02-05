import { Option } from "@hazae41/option"
import { useAtom } from "jotai"
import { RESET } from "jotai/utils"
import { useCallback, useMemo } from "react"
import { authAtom, type AuthData } from "s/atoms"

export function useAuth() {
  const [auth, setAuthImpl] = useAtom(authAtom)

  const setAuth = useCallback(
    (auth?: AuthData) => {
      setAuthImpl(Option.wrap(auth))
    },
    [setAuthImpl],
  )

  const resetAuth = useCallback(() => {
    setAuthImpl(RESET)
  }, [setAuthImpl])

  const isSignedIn = useMemo(() => auth.isSome(), [auth])

  return useMemo(
    () => ({
      auth,
      isSignedIn,
      resetAuth,
      setAuth,
    }),
    [auth, isSignedIn, resetAuth, setAuth],
  )
}
