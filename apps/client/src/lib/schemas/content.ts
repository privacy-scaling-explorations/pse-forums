import { z } from "zod"

const CONTENT_MIN_LEN = 10

export const contentSchema = z
  .string()
  .min(CONTENT_MIN_LEN, "Content should be at least 10 characters long")
