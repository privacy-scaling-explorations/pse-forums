import { Link } from "@tanstack/react-router"
import { Bell, Home, PencilLine, Rss } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "ui/sidebar"

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

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.to}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
