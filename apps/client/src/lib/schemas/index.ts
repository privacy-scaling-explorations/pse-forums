import { aboutSchema, descriptionSchema } from "l/schemas/about"
import { passwordSchema } from "l/schemas/password"
import { urlSchema } from "l/schemas/url"
import { usernameSchema } from "l/schemas/username"
import { z } from "zod"
import { nameSchema } from "./title"

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
