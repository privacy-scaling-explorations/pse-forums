import { Button } from "ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "ui/card"

export function OpenSessions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Open sessions</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border">
          <div className="flex items-center justify-between p-4">
            <div className="grid gap-1">
              <div className="font-medium">6775825k3a2d5fAr2f507d1dfaKC5m</div>
              <div className="text-sm text-muted-foreground">Current</div>
            </div>
            <Button variant="outline" size="sm">
              Sign Out
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
