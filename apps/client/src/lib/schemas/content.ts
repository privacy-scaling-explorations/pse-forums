import { z } from "zod"

const CONTENT_MIN_LEN = 10

export const contentSchema = z.string().min(CONTENT_MIN_LEN)
