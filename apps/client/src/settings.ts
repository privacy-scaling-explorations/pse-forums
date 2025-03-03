import { Bell, Settings, LucideIcon, Users } from "lucide-react";


export const MAIN_NAV_ITEMS: Record<
  "start" | "end",
  Array<{ title: string; to: string; icon: LucideIcon; requiresAuth: boolean; badge?: string }>
> = {
  start: [
    { title: "My Credentials", to: "/credentials", icon: Settings, requiresAuth: true },
    { title: "Communities", to: "/communities", icon: Users, requiresAuth: true },
    { title: "Notifications", to: "/notifications", icon: Bell, requiresAuth: true, badge: "10" },
  ],
  end: [{ title: "Settings", to: "/settings", icon: Settings, requiresAuth: true }],
};