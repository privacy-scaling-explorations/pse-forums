import { createFileRoute } from "@tanstack/react-router"
import { SignupForm } from "c/SignupForm"

export const Route = createFileRoute("/signup")({
  component: SignupForm,
})
