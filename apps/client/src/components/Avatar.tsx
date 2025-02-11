import type { FC } from "react"
import { Avatar as AvatarBase, AvatarFallback, AvatarImage } from "ui/avatar"

interface AvatarProps {
  src?: string
  username?: string | null
}

export const Avatar: FC<AvatarProps> = ({ src, username }) => (
  <AvatarBase className="mr-2">
    <AvatarImage src={src} />
    <AvatarFallback>{username?.[0].toLocaleUpperCase() || "?"}</AvatarFallback>
  </AvatarBase>
)
