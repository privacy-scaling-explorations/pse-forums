import { Link } from "@tanstack/react-router"
import { Button } from "ui/button"
import { Input } from "ui/input"
import { Separator } from "ui/separator"

export function Header() {
  return (
    <nav className="px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold">PSE Forum</h1>

        <div className="flex-1 max-w-xl mx-4">
          <Input type="search" placeholder="Search..." className="w-full" />
        </div>

        <div className="flex gap-2">
          <Link to="/signin">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </div>
      <Separator />
    </nav>
  )
}
