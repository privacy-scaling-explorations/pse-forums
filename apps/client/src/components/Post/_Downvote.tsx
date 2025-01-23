import { Button } from "c/ui/button";
import { ThumbsDown } from "lucide-react";

export function Downvote() {
  return (
    <Button variant="outline">
      <ThumbsDown />
    </Button>
  )
}
