import { QueryClient } from "@tanstack/react-query"
import { rspc, RspcProvider } from "@/lib/rspc"
import { type JSXElementConstructor, type ReactElement, useState } from "react"

export function QueryProvider({
  children,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: necessary to match the rpsc react-query types
  children: ReactElement<any, string | JSXElementConstructor<any>> | undefined
}) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <RspcProvider client={rspc} queryClient={queryClient}>
      {children}
    </RspcProvider>
  )
}
