import { Avatar } from "c/Avatar"
import { Badge } from "c/ui/badge"
import { Label } from "c/ui/label"
import { TimeSince } from "c/ui/time-since"
import type { PostDto } from "l/bindings"
// import { Eye } from "lucide-react"
import { Route } from "r/post/$pid"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "ui/card"
// import { Downvote } from "ui/downvote";
// import { EmojiReact } from "ui/emoji-react";
// import { Upvote } from "ui/upvote";
import { Comment } from "c/Comment"
import { CommentForm } from "c/forms/CommentForm"
import { Separator } from "c/ui/separator"
import { CommentCounter } from "./_CommentCounter"

export function Post() {
  const { id, title, createdAt, comments, content, tags }: PostDto = Route.useLoaderData()

  function renderComments() {
    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>
    return (
      <div className="space-y-2 w-full">
        {comments.map((c) => <Comment key={c.id} {...c} />)}
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-2">
            <Avatar username={"usr"} />
            <Label>Username</Label>
            <Badge>PSE</Badge>
            <TimeSince isoDateTime={createdAt} />
            {/* TODO Align this left, maybe split to another component */}
            {/* TODO count views */}
            {
              /*
            <div className="flex items-center">
              <Eye />
              117
            </div>
              */
            }
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="space-x-2">
            {tags.map((t) => (
              <Badge variant="secondary" key={t}>
                {t}
              </Badge>
            ))}
          </CardDescription>
        </CardHeader>
        <CardContent>{content}</CardContent>
        <CardFooter className="space-x-2">
          {/* Count votes */}
          {/* <Upvote />*/}
          {/* <Downvote /> */}
          {/* TODO: manage emoji reactions */}
          {/* <EmojiReact /> */}
          <CommentCounter />
        </CardFooter>
      </Card>
      {comments?.length > 0 ? <Separator className="w-px h-10" orientation="vertical" /> : null}
      <div className="space-y-2 w-full">
        {comments.map((c) => <Comment key={c.id} {...c} />)}
      </div>
      <CommentForm pid={id} />
    </div>
  )
}
