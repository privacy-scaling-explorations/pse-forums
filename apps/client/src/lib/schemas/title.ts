import { z } from "zod"

const TITLE_MAX_LENGTH = 50

export const nameSchema = z.string().min(1).max(TITLE_MAX_LENGTH)
export const titleSchema = nameSchema
