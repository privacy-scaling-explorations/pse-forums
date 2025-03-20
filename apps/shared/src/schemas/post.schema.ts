import { z } from "zod"


export const postReactionSchema = z.object({
  emoji: z.string(),
  count: z.number().int().default(0),
  userIds: z.array(z.string()).optional().default([]), // TODO:  probably not needed remove as we need to consider when someone is anon
})

export const badgeSchema = z.object({
  label: z.string(),
  icon: z.any().optional(),
  tooltip: z.string().optional(),
})

export const postAuthorSchema = z
  .object({
    username: z.string().nullable(),
    avatar: z.string(),
    isAnon: z.boolean().optional(),
    badges: z.array(badgeSchema),
  })
  .refine(
    (data) => (data.isAnon ? data.username === null : data.username !== null),
    {
      message: "Username must be null when isAnon is true.",
      path: ["username"],
    },
  )

export const postReplySchema = z.object({
  id: z.number(),
  content: z.string().optional(),
  author: postAuthorSchema,
  createdAt: z.string().optional(),
})

export const postSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  group: z.string(),
  replies: z.array(
    postReplySchema.and(
      z.object({
        replies: z.array(postReplySchema).optional(),
      }),
    ),
  ),
  author: postAuthorSchema,
  createdAt: z.string().optional(),
  totalViews: z.number().optional(),
  isAnon: z.boolean().optional().default(false),
  reactions: z.record(z.string(), postReactionSchema).optional(),
})

export type PostSchema = z.infer<typeof postSchema>
export type PostAuthorSchema = z.infer<typeof postAuthorSchema>
export type PostBadgeSchema = z.infer<typeof badgeSchema>
export type PostReactionSchema = z.infer<typeof postReactionSchema>
