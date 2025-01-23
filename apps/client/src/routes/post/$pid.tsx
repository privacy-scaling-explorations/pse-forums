import { createFileRoute } from '@tanstack/react-router'
import { Post } from 'components/Post'
// import { rspc } from 'l/rspc'

const mockPost = {
  id: 0,
  title: "Title 1",
  content: "Post numero uno",
  tags: ["first", "dibs"]
}

export const Route = createFileRoute('/post/$pid')({
  loader: async ({ params: { pid } }) => mockPost,
  // loader: async ({ params: { pid } }) => rspc.query(["post.read", parseInt(pid)]),
  component: Post,
  // errorComponent: TODO,
  // notFoundComponent: TODO,
})
