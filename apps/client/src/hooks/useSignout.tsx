import { useNavigate } from "@tanstack/react-router"
import { useAuth } from "h/useAuth"
import { useCallback } from "react"

export const useSignout = () => {
  const navigate = useNavigate()
  const { resetAuth } = useAuth()

  return useCallback(() => {
    resetAuth()
    navigate({ to: "/" })
  }, [resetAuth, navigate])
}
