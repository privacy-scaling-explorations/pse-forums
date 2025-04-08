import { z } from "zod"
import { badgeSchema } from "./badge.schema"

export const userSchema = z.object({
  id: z.union([z.number(), z.string()]),
  username: z.string(),
  email: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  uuid: z.string(),
  avatar: z.string(),
  isAnon: z.boolean().optional(),
  badges: z
    .array(
      badgeSchema.extend({
        expiresAt: z.string().optional().nullable(),
      }),
    )
    .optional(),
})

export type UserSchema = z.infer<typeof userSchema>
