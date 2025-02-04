import { Link } from "@tanstack/react-router"
import { useAuth } from "h/useAuth"
import { Button } from "ui/button"

export function Profile() {
  const { isSignedIn, auth } = useAuth()

  if (isSignedIn) {
    return <div>{auth?.username}</div>
  }

  return (
    <Link to="/login">
      <Button>Sign-In/Up</Button>
    </Link>
  )
}
