import { Link } from "@tanstack/react-router"
import { Link as LinkIcon } from "lucide-react"
import type { FC } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "ui/card"

const tools = [
  { name: "GrapheneOS", url: "https://grapheneos.org/" },
  { name: "Wireguard", url: "https://www.wireguard.com/" },
  { name: "TOR", url: "https://www.torproject.org/" },
]

export const Tools: FC = () => (
  <Card className="bg-gray-50">
    <CardHeader>
      <CardTitle className="self-start text-xs">PRIVACY-FIRST TOOLS</CardTitle>
      <CardDescription className="self-start text-xs">
        Tor-Friendly, RSS-Accessible
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {tools.map(({ name, url }) => (
          <a
            key={name}
            href={url}
            className="flex items-center gap-2"
            target="_blank"
            rel="noreferrer noopener"
          >
            <LinkIcon size={16} />
            {name}
          </a>
        ))}
      </div>
    </CardContent>
  </Card>
)
