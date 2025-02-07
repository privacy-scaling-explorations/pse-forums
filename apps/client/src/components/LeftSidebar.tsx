import { Link } from "@tanstack/react-router"
import { CreateGroup } from "c/CreateGroup"
import { Signout } from "c/Signout"
import { useAuth } from "h/useAuth"
import { Bell, Home as HomeIcon, PencilLine, Rss, Settings, Users } from "lucide-react"
import { Button } from "ui/button"

const items: Record<
  "start" | "mid" | "end",
  Array<{ title: string; to: string; icon: typeof Bell }>
> = {
  start: [
    { title: "Solo", to: "/solo", icon: PencilLine },
    { title: "RSS", to: "/rss", icon: Rss },
    { title: "Notifications", to: "/notifications", icon: Bell },
  ],
  mid: [{ title: "My Groups", to: "/groups", icon: Users }],
  end: [{ title: "Settings", to: "/settings", icon: Settings }],
}

const renderItems = (_items: (typeof items)[keyof typeof items]) =>
  _items.map((item) => (
    <Link to={item.to} key={item.title}>
      <Button
        className="w-full justify-start flex items-center space-x-2"
        variant="ghost"
      >
        <item.icon className="w-5 h-5" />
        <span>{item.title}</span>
      </Button>
    </Link>
  ))

const renderStartItems = () => renderItems(items.start)
const renderMidItems = () => renderItems(items.mid)
const renderEndItems = () => renderItems(items.end)

const Home = () => (
  <Link to="/" key="home">
    <Button
      className="w-full justify-start flex items-center space-x-2"
      variant="ghost"
    >
      <HomeIcon className="h-5 w-5" />
      <span>Home</span>
    </Button>
  </Link>
)
export function LeftSidebar() {
  const { auth } = useAuth()

  return (
    <aside className="w-64 pr-4 bg-gray-50 flex flex-col">
      <nav aria-label="Sidebar Navigation" className="flex flex-col flex-grow">
        <div className="space-y-2">
          <Home />
          {auth.mapSync(renderStartItems)}
        </div>

        <div className="space-y-2 mt-6">
          {auth.mapSync(renderMidItems)}
          <CreateGroup />
        </div>

        <div className="flex-grow" />

        <div className="space-y-2">
          {auth.mapSync(renderEndItems)}
          <Signout />
        </div>
      </nav>
    </aside>
  )
}
