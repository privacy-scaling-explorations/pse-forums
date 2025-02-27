import { createFileRoute } from "@tanstack/react-router";
import { Labels } from "@/components/ui/Labels";

export const Route = createFileRoute("/_left-sidebar/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Labels.PageTitle>Settings</Labels.PageTitle>
    </div>
  );
}
