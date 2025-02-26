import { createFileRoute } from "@tanstack/react-router";
import { Login } from "c/forms/Login";

export const Route = createFileRoute("/_auth/login")({
  component: Login,
});
