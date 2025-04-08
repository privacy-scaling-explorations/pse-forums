import { MyBadgesPage } from '@/sections/MyBadges'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_left-sidebar/badges/')({
  component: MyBadgesPage,
})
