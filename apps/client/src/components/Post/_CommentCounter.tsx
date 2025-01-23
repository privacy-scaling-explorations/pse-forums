import { Button } from "c/ui/button";
import { MessageSquare } from "lucide-react";

export function CommentCounter() {
  return (
    <Button variant="outline">
      <MessageSquare />
      17
    </Button>
  )
}
