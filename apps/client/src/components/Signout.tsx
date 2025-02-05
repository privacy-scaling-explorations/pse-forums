import { useLogout } from "h/useLogout"
import { LogOut } from "lucide-react"
import { Button } from "ui/button"

export const Signout = () => {
  const logout = useLogout()

  return (
    <Button
      className="w-full justify-start flex items-center space-x-2"
      variant="ghost"
      onClick={logout}
    >
      <LogOut className="h-5 w-5" />
      <span>Sign Out</span>
    </Button>
  )
}
