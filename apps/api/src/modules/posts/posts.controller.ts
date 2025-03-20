import { Request, Response } from "express"
import { ZodError } from "zod"
import { postReactionSchema } from "@shared/schemas/post.schema"
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

export async function addReaction(req: Request, res: Response) {
  try {
    const { id } = req.params

    
    const validatedData = postReactionSchema.parse(req.body)
    console.log("Request params:", req.params, req.body);

    const post = await addPostReaction(
      id,
      validatedData.emoji,
      validatedData.userIds ?? [],
    )

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }
  
    return res.status(200).json(post)
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Invalid reaction data",
        details: error.errors,
      })
    }
    return res
      .status(500)
      .json({ error: "Failed to add reaction", details: error, post: req.body })
  }
}

export async function removeReaction(req: Request, res: Response) {
  try {
    const { id, emoji } = req.params
    const { userIds } = req.body

    if (!userIds) {
      return res.status(400).json({ error: "userIds is required" })
    }

    const post = await removePostReaction(id, emoji, userIds)

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    return res.status(200).json(post)
  } catch (error) {
    return res.status(500).json({ error: "Failed to remove reaction" })
  }
}
