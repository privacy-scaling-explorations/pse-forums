import { Request, Response } from "express"
import { ZodError } from "zod"
import { postReactionSchema } from "@/shared/schemas/post.schema"
import {
  findAllPosts,
  findPostById,
  addPostReaction,
  removePostReaction,
} from "./posts.service"

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await findAllPosts()
    return res.status(200).json(posts)
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch posts" })
  }
}

export async function getPostById(req: Request, res: Response) {
  try {
    const { id } = req.params
    const post = await findPostById(id)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch post" })
  }
}

export async function toggleReaction(req: Request, res: Response) {
  try {
    const { id } = req.params
    const { emoji, userId } = req.body
    
    if (!id || !emoji || !userId) {
      return res.status(400).json({ 
        error: "Missing required fields", 
        details: "Post ID, emoji, and userId are required" 
      })
    }

    // Get current post to check existing reactions
    const currentPost = await findPostById(id)
    if (!currentPost) {
      return res.status(404).json({ error: "Post not found" })
    }

    // Check if user has already reacted with this emoji
    const hasReacted = currentPost.reactions?.[emoji]?.userIds?.includes(userId)
    
    let updatedPost
    
    if (hasReacted) {
      // User already reacted - remove the reaction
      updatedPost = await removePostReaction(id, emoji, [userId])
    } else {
      // User hasn't reacted yet - add the reaction
      updatedPost = await addPostReaction(id, emoji, [userId])
    }

    if (!updatedPost) {
      return res.status(500).json({ error: "Failed to update reaction" })
    }
  
    return res.status(200).json(updatedPost)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Invalid reaction data",
        details: error.errors,
      })
    }
    return res
      .status(500)
      .json({ 
        error: "Failed to toggle reaction", 
        details: error instanceof Error ? error.message : String(error) 
      })
  }
}
