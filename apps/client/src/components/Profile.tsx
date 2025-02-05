import { Link } from "@tanstack/react-router"
import { useAuth } from "h/useAuth"
import { Button } from "ui/button"

export function Profile() {
  const { auth } = useAuth()

  return auth.mapOrSync(
    <Link to="/login">
      <Button>Sign-In/Up</Button>
    </Link>,
    ({ username }) => <div>{username}</div>,
  )
}
