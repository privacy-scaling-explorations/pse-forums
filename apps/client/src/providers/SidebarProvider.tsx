import { AppSidebar } from "c/AppSidebar"
import { SidebarProvider as SidebarProviderBase, SidebarTrigger } from "c/ui/sidebar"

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProviderBase>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProviderBase>
  )
}
