import { CommunitiesPage } from '@/sections/Communities'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_left-sidebar/communities/')({
  component: CommunitiesPage,
})
