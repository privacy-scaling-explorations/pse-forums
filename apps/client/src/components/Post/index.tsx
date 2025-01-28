import { Avatar } from "c/Avatar"
import { CommentList } from "c/Comment"
import { Badge } from "c/ui/badge"
import { Label } from "c/ui/label"
import type { PostDto } from "l/bindings"
import { Eye } from "lucide-react"
import { Route } from "r/post/$pid"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "ui/card"
import { Downvote } from "../ui/downvote"
import { EmojiReact } from "../ui/emoji-react"
import { Upvote } from "../ui/upvote"
import { CommentCounter } from "./_CommentCounter"

export function Post() {
  const { id, title, created_at, content, tags }: PostDto = Route.useLoaderData()

  return (
    <div className="space-y-10">
      <Card className="w-full">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-2">
            <Avatar username={"usr"} />
            <Label>Username</Label>
            <Badge>PSE</Badge>
            <Label className="italic">{created_at}</Label>
            {/* TODO Align this left, maybe split to another component */}
            <div className="flex items-center">
              <Eye />
              117
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription className="space-x-2">
            {tags.map(t => <Badge variant="secondary" key={t}>{t}</Badge>)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
        <CardFooter className="space-x-2">
          <Upvote />
          <Downvote />
          <EmojiReact />
          <CommentCounter />
        </CardFooter>
      </Card>
      <CommentList pid={id} />
    </div>
  )
}
