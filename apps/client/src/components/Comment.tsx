import { Avatar } from "c/Avatar"
// import { Downvote } from "c/ui/downvote";
// import { EmojiReact } from "c/ui/emoji-react";
import { Label } from "c/ui/label"
import { TimeSince } from "c/ui/time-since"
// import { Upvote } from "c/ui/upvote";
import type { CommentDto } from "l/bindings"
import { Card, CardContent, CardFooter, CardHeader } from "ui/card"

export function Comment({ content, createdAt, username }: CommentDto) {
  return (
    <Card className="w-full">
      <CardHeader className="space-y-4">
        <div className="flex items-center space-x-2">
          <Avatar username={username} />
          <span>{username}</span>
          <TimeSince isoDateTime={createdAt} />
        </div>
      </CardHeader>
      <CardContent>{content}</CardContent>
      <CardFooter className="space-x-2">
        {
          /* TODO: manage votes and emoji reactions
        <Upvote />
        <Downvote />
        <EmojiReact />
          */
        }
      </CardFooter>
    </Card>
  )
}
