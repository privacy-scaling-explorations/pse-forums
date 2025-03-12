import { Option } from "@hazae41/option"
import { useAtom } from "jotai"
import { RESET } from "jotai/utils"
import { useCallback, useMemo } from "react"
import { authAtom, type AuthData } from "@/state/atoms"
import { useMutation } from "@tanstack/react-query"
import { useGlobalContext } from "@/contexts/GlobalContext"

export function useAuth() {
  const [auth, setAuthImpl] = useAtom(authAtom)

  const setAuth = useCallback(
    (auth?: AuthData) => setAuthImpl(Option.wrap(auth)),
    [setAuthImpl],
  )

  const resetAuth = useCallback(() => {
    setAuthImpl(RESET)
  }, [setAuthImpl])

  return useMemo(
    () => ({
      auth,
      resetAuth,
      setAuth,
    }),
    [auth, resetAuth, setAuth],
  )
}

export function useMockAuth({ onSuccess }: { onSuccess?: () => void } = {}) {
  const { setIsLoggedIn } = useGlobalContext()

  return useMutation({
    mutationFn: () => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setIsLoggedIn(true)
          resolve()
          onSuccess?.()
        }, 1000)
      })
    },
  })
}
