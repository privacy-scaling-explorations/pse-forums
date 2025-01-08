import { Link } from "@tanstack/react-router"
import { Button } from "c/ui/button"
import { Bell, Home, PencilLine, Rss } from "lucide-react"

const items = [
  {
    title: "Home",
    to: "/",
    icon: Home,
  },
  {
    title: "Solo",
    to: "/solo",
    icon: PencilLine,
  },
  {
    title: "RSS",
    to: "/rss",
    icon: Rss,
  },
  {
    title: "Notifications",
    to: "/notifications",
    icon: Bell,
  },
]

export function LeftSidebar() {
  return (
    <aside className="w-64 pr-4 bg-gray-50">
      <nav className="space-y-2">
        {items.map((item) => (
          <Link to={item.to} key={item.title}>
            <Button className="w-full justify-start" variant="ghost">
              <item.icon />
              {item.title}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
