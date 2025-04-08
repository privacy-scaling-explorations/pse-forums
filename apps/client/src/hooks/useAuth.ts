import { Option } from "@hazae41/option"
import { useAtom } from "jotai"
import { RESET } from "jotai/utils"
import { useCallback, useMemo } from "react"
import { authAtom, type AuthData } from "@/state/atoms"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useGlobalContext } from "@/contexts/GlobalContext"
import { API_URL } from "../settings"

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

export function useGetUser() {
  const { isLoggedIn } = useGlobalContext();
  return useQuery({
    enabled: isLoggedIn,
    queryKey: ["getUser"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/api/me`)
      return response.json()
    },
  })
}