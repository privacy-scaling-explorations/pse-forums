import { postMocks } from "@shared/mocks/posts.mocks"
import { PostSchema } from "@shared/schemas/post.schema"

export async function findAllPosts(): Promise<PostSchema[]> {
  return postMocks
}

export async function findPostById(
  id: string | number,
): Promise<PostSchema | undefined> {
  return postMocks.find((post) => Number(post.id) === Number(id))
}

export async function addPostReaction(
  postId: string,
  emoji: string,
  userIds: string[],
): Promise<PostSchema | undefined> {
  const post = postMocks?.find((p) => Number(p.id) === Number(postId))
  if (!post) return undefined

  if (!post?.reactions?.[emoji]) {
    post.reactions = {
      ...post.reactions,
      [emoji]: {
        emoji,
        count: 0,
        userIds: [],
      },
    }
  }

  const reaction = post?.reactions?.[emoji]

  if (!reaction?.userIds?.some((id) => userIds.includes(id))) {
    reaction.userIds?.push(...userIds)
  }
  reaction.count += userIds.length ?? 0

  return post
}

export async function removePostReaction(
  postId: string,
  emoji: string,
  userIds: string[],
): Promise<PostSchema | undefined> {
  const post = postMocks?.find((p) => Number(p.id) === Number(postId))
  if (!post) return undefined

  const reaction = post?.reactions?.[emoji]
  if (!reaction) return post

  // Remove user from reaction
  const userIndex = reaction.userIds?.findIndex((id) => userIds.includes(id))
  if (userIndex) {
    reaction.userIds?.splice(userIndex, 1)
    reaction.count -= 1

    // Remove reaction entirely if no users left
    if (reaction.count === 0) {
      delete post.reactions?.[emoji]
    }
  }

  return post
}
