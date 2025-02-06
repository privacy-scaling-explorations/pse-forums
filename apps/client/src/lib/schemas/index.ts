import { aboutSchema } from "l/schemas/about"
import { passwordSchema } from "l/schemas/password"
import { usernameSchema } from "l/schemas/username"
import { z } from "zod"

export const basicInfoSchema = z.object({
  about: aboutSchema,
  username: usernameSchema,
  url: z.string().url(),
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

export const updateUsernameSchema = z.object({
  username: usernameSchema,
})
