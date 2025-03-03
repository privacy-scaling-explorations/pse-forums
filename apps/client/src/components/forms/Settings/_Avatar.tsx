import { Upload } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/cards/Card"
import { Input } from "@/components/inputs/Input"

export function AvatarSettings() {
  return (
    <Card.Base>
      <Card.Header>
        <Card.Title className="text-xl">Your avatar</Card.Title>
        <Card.Description>
          Your image will show up here when uploading your profile.
        </Card.Description>
      </CardHeader>
      <Card.Content className="space-y-4">
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
      </Card.Content>
    </Card.Base>
  )
}
