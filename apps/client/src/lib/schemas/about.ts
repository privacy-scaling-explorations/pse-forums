import { z } from "zod"

const ABOUT_MIN_LENGTH = 10
const ABOUT_MAX_LENGTH = 500

export const aboutSchema = z
  .string()
  .min(ABOUT_MIN_LENGTH)
  .max(ABOUT_MAX_LENGTH)
  .or(z.literal(""))
  .optional()

export const descriptionSchema = aboutSchema
