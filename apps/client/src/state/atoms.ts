import { None, type Option } from "@hazae41/option"
import { atomWithStorage, createJSONStorage } from "jotai/utils"

export type AuthData = {
  token: string
  uid: number
  username: string
}

type AuthStorage = {
  auth: Option<AuthData>
}

export const AUTH_LOCAL_STORAGE_KEY = "auth"

const storage = createJSONStorage<AuthStorage>(() => localStorage)
export const authAtom = atomWithStorage<AuthStorage>(
  AUTH_LOCAL_STORAGE_KEY,
  { auth: new None() },
  storage,
)
