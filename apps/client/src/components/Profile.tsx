import { Link } from "@tanstack/react-router"
import { Signout } from "c/Signout"
import { useAuth } from "h/useAuth"
import { Button } from "ui/button"

const renderSignin = () => (
  <Link to="/login">
    <Button>Sign-In/Up</Button>
  </Link>
)

export function Profile() {
  const { auth } = useAuth()

  return auth.mapOrElseSync(renderSignin, ({ username }) => <div>{username}</div>)
}
