import { createFileRoute } from "@tanstack/react-router"
import { CreateGroup as component } from "c/forms/GroupForm"

export const Route = createFileRoute("/group/create")({ component })
