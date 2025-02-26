import { Bell, Settings, LucideIcon } from "lucide-react";


export const MAIN_NAV_ITEMS: Record<
  "start" | "end",
  Array<{ title: string; to: string; icon: LucideIcon; requiresAuth: boolean }>
> = {
  start: [
    { title: "My Credentials", to: "/credentials", icon: Settings, requiresAuth: true },
    { title: "Notifications", to: "/notifications", icon: Bell, requiresAuth: true },
  ],
  end: [{ title: "Settings", to: "/settings", icon: Settings, requiresAuth: true }],
};