import { z } from "zod"

const TITLE_MAX_LENGTH = 200

export const nameSchema = z.string().min(1).max(TITLE_MAX_LENGTH, "Title must be less than 200 characters")
export const titleSchema = nameSchema
