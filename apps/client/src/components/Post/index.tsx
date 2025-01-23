import { Avatar } from "c/Avatar"
import { Label } from "c/ui/label"
import { PostDto } from "l/bindings"
import { Route } from "r/post/$pid"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "ui/card"
import { Downvote } from "./_Downvote"
import { Upvote } from "./_Upvote"
import { EmojiReact } from "./_EmojiReact"
import { CommentCounter } from "./_CommentCounter"
import { Badge } from "c/ui/badge"
import { Eye } from "lucide-react"

export function Post() {
  const { title, content, tags }: PostDto = Route.useLoaderData()

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-xl">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-2">
            <Avatar username={"usr"} />
            <Label>Username</Label>
            <Badge>PSE</Badge>
            <Label className="italic">00/00/0000</Label>
            {/* TODO Align this left, maybe split to another component */}
            <div className="flex items-center">
              <Eye />
              117
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>
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
    </div>
  )
}
