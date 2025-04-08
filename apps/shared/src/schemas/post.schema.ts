import { z } from "zod"
import { badgeSchema } from "./badge.schema"
import { communitySchema } from "./community.schema"

export const postReactionSchema = z.object({
  emoji: z.string(),
  count: z.number().int().default(0),
  userIds: z.array(z.string()).optional().default([]),
})

export const postAuthorSchema = z
  .object({
    id: z.string().nullable(),
    username: z.string().nullable().optional(),
    isAnon: z.boolean().default(false),
    badges: z.array(z.number()).optional(),
  })
  .refine(
    (data) => (data?.isAnon ? data?.id === null : data?.id !== null),
    {
      message: "Id must be null when isAnon is true.",
      path: ["id"],
    },
  )

export const postReplySchema = z.object({
  id: z.union([z.number(), z.string()]),
  content: z.string().optional(),
  author: postAuthorSchema,
  createdAt: z.string().optional(),
  postMention: z.union([z.number(), z.string()]).optional().nullable(),
})

export const postSchema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string(),
  content: z.string(),
  replies: z.array(
    postReplySchema.and(
      z.object({
        replies: z.array(postReplySchema).optional(),
      }),
    ),
  ),
  author: postAuthorSchema,
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  totalViews: z.number().optional(),
  isAnon: z.boolean().optional().default(false),
  reactions: z.record(z.string(), postReactionSchema).optional(),
  community: z.union([z.number(), z.string()]).optional(),
  communityData: communitySchema.optional(),
  tags: z.array(z.string()).optional(),
})

export const createPostFormSchema = z.object({
  title: z.string().min(10, "A title is required to continue."),
  content: z.string().min(10, "A content is required to continue."),
  author: z.object({
    id: z.string().nullable(),
    username: z.string().nullable().optional(),
    isAnon: z.boolean(),
    badges: z.array(z.string()).optional(),
  }),
  isAnon: z.boolean(),
  community: z.string().min(1, "Please select a community before posting."),
})


export type PostSchema = z.infer<typeof postSchema>
export type PostAuthorSchema = z.infer<typeof postAuthorSchema>
export type PostBadgeSchema = z.infer<typeof badgeSchema>
export type PostReactionSchema = z.infer<typeof postReactionSchema>
export type CreatePostSchema = z.infer<typeof createPostFormSchema>
