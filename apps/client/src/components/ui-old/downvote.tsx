import { Button } from "@/components/ui/Button"
import { ThumbsDown } from "lucide-react"

export function Downvote() {
  return (
    <Button variant="outline">
      <ThumbsDown />
    </Button>
  )
}
