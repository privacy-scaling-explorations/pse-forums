import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteLayout,
});

function RouteLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
