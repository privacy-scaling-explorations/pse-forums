import { CredentialsPage } from '@/sections/Credentials'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_left-sidebar/credentials/')({
  component: CredentialsPage,
})
