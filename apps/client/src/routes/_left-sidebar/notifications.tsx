import { NotificationsPage } from '@/sections/Notifications'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/_left-sidebar/notifications")({
  component: NotificationsPage,
});
