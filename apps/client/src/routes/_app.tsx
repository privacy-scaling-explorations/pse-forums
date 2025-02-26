import { createFileRoute, Outlet } from "@tanstack/react-router";
import { MainLayout } from "c/MainLayout";

export const Route = createFileRoute("/_app")({
  component: RouteLayout,
});

function RouteLayout() {
  return (
    <MainLayout showHeader showLeftSidebar showRightSidebar>
      <Outlet />
    </MainLayout>
  );
}
