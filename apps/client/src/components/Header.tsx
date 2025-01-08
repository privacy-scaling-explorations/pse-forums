import { Button } from "c/ui/button"
import { Input } from "c/ui/input"
import { Separator } from "c/ui/separator"

export function Header() {
  return (
    <nav className="px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto mb-2">
        <h1 className="text-xl font-bold">PSE Forum</h1>

        <div className="flex-1 max-w-xl mx-4">
          <Input type="search" placeholder="Search..." className="w-full" />
        </div>

        <div className="flex gap-2">
          <Button variant="outline">Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
      <Separator />
    </nav>
  )
}
