import { z } from "zod"

const USERNAME_REGEX = /^[a-zA-Z0-9_]{1,20}$/

export const usernameSchema = z.string().regex(USERNAME_REGEX, {
  message: "Invalid username (should be alphanumeric and between 1 and 20 characters, `_` is allowed)",
})
