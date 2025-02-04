import { useAtom } from "jotai"
import { authAtom, type AuthData } from "l/auth"
import { useCallback, useMemo } from "react"

export function useAuth() {
  const [{ auth }, setAuthImpl] = useAtom(authAtom)

  const setAuth = useCallback((auth?: AuthData) => {
    setAuthImpl({ auth })
  }, [setAuthImpl])

  const isSignedIn = useMemo(() => !!auth, [auth])

  return useMemo(() => ({
    auth,
    isSignedIn,
    setAuth,
  }), [auth, isSignedIn, setAuth])
}
