import { useQuery } from "@tanstack/react-query"
import { postMocks } from "mocks/postMocks"

export const useGetPostById = (postId: number) => {
  return useQuery({
    queryKey: ["post.read", postId],
    queryFn: () => {
        const postById = postMocks.find((post) => post?.id === postId)
        if (!postById) {
            throw new Error("Post not found")
        }
        return postById
    },
  })
}
