import { createReactQueryHooks } from "@rspc/react-query"
import type { Procedures } from "./bindings"

export const rspc = createReactQueryHooks<Procedures>()
