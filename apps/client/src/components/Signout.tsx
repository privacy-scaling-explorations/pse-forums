import { useAuth } from "@/hooks/useAuth"
import { useSignout } from "@/hooks/useSignout"
import { LogOut } from "lucide-react"
import { Button } from "@/components/Button"

export const Signout = () => {
  const signout = useSignout()
  const { auth } = useAuth()

  return auth.mapSync(() => (
    <Button
      className="w-full justify-start flex items-center space-x-2"
      variant="ghost"
      onClick={signout}
    >
      <LogOut className="h-5 w-5" />
      <span>Sign Out</span>
    </Button>
  ))
}
