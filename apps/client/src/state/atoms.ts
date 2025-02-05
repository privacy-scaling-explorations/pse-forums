import { None, Option, Some } from "@hazae41/option"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

export type AuthData = {
  token: string
  uid: number
  username: string
}

export const AUTH_LOCAL_STORAGE_KEY = "auth"

const storage = createJSONStorage<Option<AuthData>>(() => localStorage, {
  replacer: (key, value) => {
    console.log(key, value)
    if (value instanceof None) return null
    if (value instanceof Some) return value.get()
    return value
  },
  reviver: (key, value) => {
    console.log(key, value)
    return Option.wrap(value)
  },
})

export const authAtom = atomWithStorage<Option<AuthData>>(
  AUTH_LOCAL_STORAGE_KEY,
  new None(),
  storage,
)
