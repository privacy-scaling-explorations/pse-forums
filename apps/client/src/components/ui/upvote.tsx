import { Button } from "c/ui/Button"
import { Heart } from "lucide-react"

export function Upvote() {
  return (
    <Button variant="outline">
      <Heart />
      3
    </Button>
  )
}
