import { z } from "zod"
import zxcvbn from "zxcvbn"

export const PASSWORD_MIN_LEN = 10
export const PASSWORD_MAX_LEN = 40

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LEN, {
    message: `Password must be at least ${PASSWORD_MIN_LEN} characters long`,
  })
  .max(PASSWORD_MAX_LEN, {
    message: `Password must not exceed ${PASSWORD_MAX_LEN} characters`,
  })
  .refine((password) => zxcvbn(password).score >= 3, {
    message: "Password is too weak: try mixing uppercase, lowercase, numbers, and symbols",
  })
