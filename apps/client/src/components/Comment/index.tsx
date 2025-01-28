import { Card } from "ui/card"
import { useQuery } from "l/rspc"
import { Comment } from "./_Comment"

export function CommentList({ pid }: { pid: number }) {
  // TODO Only get comments for post (pid)
  const { data: comments, isLoading, error } = useQuery(["comment.list"])

  // TODO Error state
  if (error) {
    console.error(error.message)
    return <div>{error.message}</div>
  }

  // TODO Loading state
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      {comments.map((c) => <Comment key={c.id} {...c} />)}
    </Card>
  )
}
