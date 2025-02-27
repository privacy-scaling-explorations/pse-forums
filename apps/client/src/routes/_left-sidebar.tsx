import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainLayout } from "@/components/MainLayout"; 

export const Route = createFileRoute("/_left-sidebar")({
  component: RouteLayout,
});

function RouteLayout() {
  return (
    <MainLayout showHeader showLeftSidebar>
      <Outlet />
    </MainLayout>
  );
}
