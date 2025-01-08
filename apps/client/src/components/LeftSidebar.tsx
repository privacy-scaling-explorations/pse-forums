import { Link } from "@tanstack/react-router"
import { Bell, Home, LogOut, PencilLine, Rss, Settings, Users } from "lucide-react"
import { Button } from "ui/button"

const items = {
  start: [
    { title: "Home", to: "/", icon: Home },
    { title: "Solo", to: "/solo", icon: PencilLine },
    { title: "RSS", to: "/rss", icon: Rss },
    { title: "Notifications", to: "/notifications", icon: Bell },
  ],
  mid: [{ title: "My Groups", to: "/groups", icon: Users }],
  end: [
    { title: "Settings", to: "/settings", icon: Settings },
    { title: "Sign Out", to: "/logout", icon: LogOut },
  ],
}

export function LeftSidebar() {
  return (
    <aside className="w-64 pr-4 bg-gray-50 flex flex-col h-screen">
      <nav aria-label="Sidebar Navigation" className="flex flex-col flex-grow">
        {/* Start Section */}
        <div className="space-y-2">
          {items.start.map((item) => (
            <Link to={item.to} key={item.title}>
              <Button
                className="w-full justify-start flex items-center space-x-2"
                variant="ghost"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.title}</span>
              </Button>
            </Link>
          ))}
        </div>

        {/* Mid Section */}
        {items.mid.length > 0 && (
          <div className="mt-4 space-y-2">
            {items.mid.map((item) => (
              <Link to={item.to} key={item.title}>
                <Button
                  className="w-full justify-start flex items-center space-x-2"
                  variant="ghost"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Button>
              </Link>
            ))}
          </div>
        )}

        {/* Spacer to push end items to the bottom */}
        <div className="flex-grow" />

        {/* End Section */}
        {items.end.length > 0 && (
          <div className="space-y-2 mt-4">
            {items.end.map((item) => (
              <Link to={item.to} key={item.title}>
                <Button
                  className="w-full justify-start flex items-center space-x-2"
                  variant="ghost"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </Button>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </aside>
  )
}
