import { z } from "zod";
import { badgeSchema, postSchema } from "./post.schema";
import { userSchema } from "./user.schema";

export const communitySchema = z.object({
  id: z.number(),
  name: z.string(),
  requiredBadges: z.array(badgeSchema),
  description: z.string(),
  avatar: z.string().optional(),
  banner: z.string().optional(),
  members: z.array(userSchema),
  posts: z.array(postSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
});
