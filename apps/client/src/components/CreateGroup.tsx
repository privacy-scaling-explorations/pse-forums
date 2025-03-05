import { Link } from "@tanstack/react-router"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/Button"

export const CreateGroup = () => (
  <Link to="/group/create">
    <Button
      className="w-full justify-start flex items-center space-x-2"
      variant="ghost"
    >
      <Plus className="h-5 w-5" />
      <span>Create Group</span>
    </Button>
  </Link>
)
