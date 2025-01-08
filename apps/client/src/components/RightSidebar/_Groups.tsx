import { Avatar } from "c/Avatar"
import { Button } from "c/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "c/ui/card"
import { Separator } from "c/ui/separator"
import type { FC } from "react"

const groups = ["Rust", "Dev", "PSE"]

export const Groups: FC = () => (
  <Card className="bg-gray-50">
    <CardHeader>
      <CardTitle className="self-start text-xs">EXPLORE GROUPS</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        {groups.map((group, i) => (
          <>
            <div key={group} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Avatar />
                <span className="font-bold">{group}</span>
              </div>
              <Button variant="outline" size="sm">
                Join
              </Button>
            </div>
            {i < groups.length - 1 && <Separator />}
          </>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="ghost" size="sm">
        Show more
      </Button>
    </CardFooter>
  </Card>
)
