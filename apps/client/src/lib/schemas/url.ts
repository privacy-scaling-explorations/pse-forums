import { z } from "zod"

const URL_REGEX = /^(https?:\/\/)([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})(:\d{1,5})?(\/.*)?$/

export const urlSchema = z
  .string()
  .regex(URL_REGEX, { message: "Invalid URL format" })
  .or(z.literal(""))
  .optional()
