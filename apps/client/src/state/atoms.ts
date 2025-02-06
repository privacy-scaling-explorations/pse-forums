import { None, type Option, Some } from "@hazae41/option"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

export type AuthData = {
  token: string
  uid: number
  username: string
}

export const AUTH_LOCAL_STORAGE_KEY = "auth"

const storage = createJSONStorage<Option<AuthData>>(() => localStorage, {
  replacer: (_, value) => {
    if (value instanceof None) return null
    if (value instanceof Some) return value.get()
    return value
  },
  reviver: (_, value) => {
    if (value === null || value === undefined) return new None()
    if (
      typeof value === "object"
      && "token" in value
      && "uid" in value
      && "username" in value
    ) {
      return new Some(value as AuthData)
    }
    return value
  },
})

export const authAtom = atomWithStorage<Option<AuthData>>(
  AUTH_LOCAL_STORAGE_KEY,
  new None(),
  storage,
)
