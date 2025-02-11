import { Avatar } from "c/Avatar"
import { Downvote } from "c/ui/downvote"
import { EmojiReact } from "c/ui/emoji-react"
import { Label } from "c/ui/label"
import { TimeSince } from "c/ui/time-since"
import { Upvote } from "c/ui/upvote"
import type { CommentDto } from "l/bindings"
import { Card, CardContent, CardFooter, CardHeader } from "ui/card"

export function Comment({ content, createdAt }: CommentDto) {
  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-2">
          <Avatar username={"usr"} />
          <Label>Username</Label>
          <TimeSince isoDateTime={createdAt} />
        </div>
      </CardHeader>
      <CardContent className="ml-14">{content}</CardContent>
      <CardFooter className="space-x-2 ml-14">
        <Upvote />
        <Downvote />
        <EmojiReact />
      </CardFooter>
    </Card>
  )
}
