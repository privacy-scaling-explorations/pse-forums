import { Button } from "c/ui/button"
import { Input } from "c/ui/input"
import { Separator } from "c/ui/separator"
import { SidebarTrigger } from "c/ui/sidebar"

export const Header = () => (
  <>
    <header className="flex justify-between items-center mb-2">
      <SidebarTrigger />
      <h1 className="text-2xl font-bold">PSE Forum</h1>
      <div className="flex-grow flex justify-center">
        <Input className="w-1/2" type="text" placeholder="Search" />
      </div>
      <div className="flex space-x-4">
        <Button>Login</Button>
      </div>
    </header>
    <Separator className="mb-2" />
  </>
)
