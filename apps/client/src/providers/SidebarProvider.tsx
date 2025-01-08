import { AppSidebar } from "c/AppSidebar"
import { SidebarProvider as SidebarProviderBase } from "c/ui/sidebar"

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProviderBase>
      <AppSidebar />
      {children}
    </SidebarProviderBase>
  )
}
