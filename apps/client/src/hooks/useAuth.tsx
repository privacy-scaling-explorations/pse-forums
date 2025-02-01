import { AuthContext } from "p/AuthProvider"
import { useContext } from "react"

export function useAuth() {
  const authCtx = useContext(AuthContext)

  if (!authCtx) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return authCtx
}
