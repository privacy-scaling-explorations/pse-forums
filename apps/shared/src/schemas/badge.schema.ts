import { z } from "zod";

export const badgeSchema = z.object({
  id: z.union([z.number(), z.string()]),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  createdAt: z.string(),
});

export type BadgeSchema = z.infer<typeof badgeSchema>;