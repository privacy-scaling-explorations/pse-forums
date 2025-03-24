import { z } from "zod";
import { badgeSchema } from "./post.schema";

export const userSchema = z.object({
  id: z.number(),
  username: z.string().optional(),
  email: z.string().optional(),
  website: z.string().optional(),
  bio: z.string().optional(),
  uuid: z.string(),
  avatar: z.string(),
  isAnon: z.boolean().optional(),
  badges: z.array(badgeSchema).optional(),
});

export type UserSchema = z.infer<typeof userSchema>;
