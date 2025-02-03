import { Link } from "@tanstack/react-router"
import { Input } from "ui/input"
import { Separator } from "ui/separator"
import { Profile } from "./Profile"

export function Header() {
  return (
    <nav className="px-4 py-3">
      <div className="flex items-center justify-between mb-2">
        <Link to="/">
          <h1 className="text-xl font-bold">PSE Forum</h1>
        </Link>

        <div className="flex-1 max-w-xl mx-4">
          <Input type="search" placeholder="Search..." className="w-full" />
        </div>

        <div className="flex gap-2">
          <Profile />
        </div>
      </div>
      <Separator />
    </nav>
  )
}
