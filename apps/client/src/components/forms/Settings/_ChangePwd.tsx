import { Label } from "@radix-ui/react-label"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "c/cards/Card"
import { Input } from "ui/input"

export function ChangePwdSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Change password</CardTitle>
        <CardDescription>
          Change your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current-password">Old Password</Label>
          <Input
            type="password"
            id="current-password"
            placeholder="Enter your current password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-password">New Password</Label>
          <Input
            type="password"
            id="new-password"
            placeholder="Create a strong new password"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Re-enter Password</Label>
          <Input
            type="password"
            id="confirm-password"
            placeholder="Confirm your new password"
          />
        </div>
        <Button className="ml-auto">Save</Button>
      </CardContent>
    </Card>
  )
}
