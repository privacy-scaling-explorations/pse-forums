import { z } from "zod"

const badgeSchema = z.object({
  label: z.string(),
  icon: z.any().optional(),
  tooltip: z.string().optional(),
})

const authorSchema = z
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

const postReplySchema = z.object({
  id: z.number(),
  content: z.string().optional(),
  author: authorSchema,
  createdAt: z.string().optional(),
})

export const schemaPost = z.object({
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
  author: authorSchema,
  createdAt: z.string().optional(),
  totalViews: z.number().optional(),
  isAnon: z.boolean().optional().default(false),
})

export type PostSchema = z.infer<typeof schemaPost>
export type AuthorSchema = z.infer<typeof authorSchema>
export type BadgeSchema = z.infer<typeof badgeSchema>
