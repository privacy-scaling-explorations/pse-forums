import { aboutSchema, descriptionSchema } from "l/schemas/about"
import { contentSchema } from "l/schemas/content"
import { passwordSchema } from "l/schemas/password"
import { nameSchema, titleSchema } from "l/schemas/title"
import { urlSchema } from "l/schemas/url"
import { usernameSchema } from "l/schemas/username"
import { z } from "zod"

export const basicInfoSchema = z
  .object({
    about: aboutSchema.optional(),
    username: usernameSchema.optional(),
    url: urlSchema,
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: "At least one field is required",
  })

export type BasicInfoSchema = z.infer<typeof basicInfoSchema>

export const signinSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
})

export type SigninSchema = z.infer<typeof signinSchema>

export const signupSchema = z.object({
  confirm: passwordSchema,
  email: z.string().email(),
  username: usernameSchema,
  password: passwordSchema,
})

export type SignupSchema = z.infer<typeof signupSchema>

export const createGroupSchema = z.object({
  createBandadaGroup: z.boolean().optional(),
  description: descriptionSchema,
  name: nameSchema,
})

export type CreateGroupSchema = z.infer<typeof createGroupSchema>

export const createPostSchema = z.object({
  content: contentSchema,
  gid: z.number().int().positive(),
  title: titleSchema,
  // tags: z.array(z.string()).min(1), // TODO
})

export type CreatePostSchema = z.infer<typeof createPostSchema>
