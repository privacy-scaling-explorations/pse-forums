import { Upload } from "lucide-react"
import { Button } from "c/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "c/cards/Card"
import { Input } from "ui/input"

export function AvatarSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Your avatar</CardTitle>
        <CardDescription>
          Your image will show up here when uploading your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-muted" />
          <div className="space-y-2">
            <Input id="picture" type="file" className="w-[400px]" />
            <Button size="sm">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
