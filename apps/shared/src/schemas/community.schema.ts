import { z } from "zod";

export const communitySchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  requiredBadges: z.array(z.union([z.number(), z.string()])),
  description: z.string(),
  avatar: z.string().optional(),
  banner: z.string().optional(),
  members: z.array(z.union([z.number(), z.string()])),
  createdAt: z.string(),
  updatedAt: z.string(),
  isPrivate: z.boolean().default(false).optional(),
});

export type CommunitySchema = z.infer<typeof communitySchema>;