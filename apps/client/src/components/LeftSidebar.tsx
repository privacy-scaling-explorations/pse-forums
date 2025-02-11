import { Link } from "@tanstack/react-router"
import { CreateGroup } from "c/CreateGroup"
import { Signout } from "c/Signout"
import { useAuth } from "h/useAuth"
import { useQuery } from "l/rspc"
import {
  // Bell,
  Home as HomeIcon,
  //  PencilLine,
  //  Rss,
  Settings,
  Users,
} from "lucide-react"
import { Button } from "ui/button"

type Icon = typeof Settings

const items: Record<
  "start" | "end",
  Array<{ title: string; to: string; icon: Icon }>
> = {
  start: [
    // TODO
    //  { title: "Solo", to: "/solo", icon: PencilLine },
    //  { title: "RSS", to: "/rss", icon: Rss },
    //  { title: "Notifications", to: "/notifications", icon: Bell },
  ],
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
  // @ts-ignore FIXME
  const { data: user } = useQuery(["user.read", auth.inner?.username], {
    enabled: auth.isSome(),
  })

  return (
    <aside className="w-64 pr-4 bg-gray-50 flex flex-col">
      <nav aria-label="Sidebar Navigation" className="flex flex-col flex-grow">
        <div className="space-y-2">
          <Home />
          {auth.mapSync(renderStartItems)}
        </div>

        {user !== undefined && (
          <div className="space-y-2 mt-6">
            <div className="w-full justify-start flex items-center space-x-3 px-4 py-2 text-sm">
              <Users className="w-5 h-5" />
              <span>My Groups</span>
            </div>
            {user.memberships.map(([gid, name]) => (
              <Link key={gid} to="/group/$gid" params={{ gid: `${gid}` }}>
                <Button
                  className="w-full justify-start flex items-center space-x-2"
                  variant="ghost"
                >
                  <span>{name}</span>
                </Button>
              </Link>
            ))}
            <CreateGroup />
          </div>
        )}

        <div className="flex-grow" />

        <div className="space-y-2">
          {auth.mapSync(renderEndItems)}
          <Signout />
        </div>
      </nav>
    </aside>
  )
}
