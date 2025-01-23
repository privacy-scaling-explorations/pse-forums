import { Label } from "@radix-ui/react-label"
import { Button } from "ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "ui/card"
import { Input } from "ui/input"

export function RecoveryCode() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Recovery code</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="recovery-password">Password</Label>
          <Input
            id="recovery-password"
            type="password"
            placeholder="You must input your password to generate or reset your recovery code."
          />
        </div>
        <Button>Generate recovery code</Button>
      </CardContent>
    </Card>
  )
}
