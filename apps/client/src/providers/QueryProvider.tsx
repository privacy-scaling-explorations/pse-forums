import { createClient, FetchTransport } from "@rspc/client"
import { QueryClient } from "@tanstack/react-query"
import type { Procedures } from "l/bindings"
import { rspc } from "l/rspc"
import { type JSXElementConstructor, type ReactElement, useState } from "react"

export function QueryProvider({
  children,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: necessary to match the rpsc react-query types
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}) {
  const [queryClient] = useState(() => new QueryClient())
  const [rspcClient] = useState(() =>
    createClient<Procedures>({
      transport: new FetchTransport("http://localhost:3000/rspc"),
    })
  )

  return (
    <rspc.Provider client={rspcClient} queryClient={queryClient}>
      {children}
    </rspc.Provider>
  )
}
