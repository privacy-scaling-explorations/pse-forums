import { None, type Option } from "@hazae41/option"
import type { Session } from "@supabase/supabase-js"
import { atom } from "jotai"

export const sessionAtom = atom<Option<Session>>(new None())
