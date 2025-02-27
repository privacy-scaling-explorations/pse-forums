import { createFileRoute } from "@tanstack/react-router";
import { Login } from "@/components/forms/Login";

export const Route = createFileRoute("/_auth/login")({
  component: Login,
});
