import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from "c/ui/avatar"
import type { FC } from "react"

interface AvatarProps {
  src?: string
  username?: string
}

export const Avatar: FC<AvatarProps> = ({ src, username }) => (
  <AvatarBase className="mr-2">
    <AvatarImage src={src} />
    <AvatarFallback>{username?.[0].toLocaleUpperCase() || "?"}</AvatarFallback>
  </AvatarBase>
)
