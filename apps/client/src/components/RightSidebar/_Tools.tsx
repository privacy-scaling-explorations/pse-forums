import { Link } from "@tanstack/react-router"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "c/ui/card"
import { Link as LinkIcon } from "lucide-react"
import type { FC } from "react"

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
        {["Redlib", "Nitters", "BiblioReads"].map((tool) => (
          <Link key={tool} to="/" className="flex items-center gap-2">
            <LinkIcon />
            {tool}
          </Link>
        ))}
      </div>
    </CardContent>
  </Card>
)
