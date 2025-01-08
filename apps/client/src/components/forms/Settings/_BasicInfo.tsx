import { Label } from "@radix-ui/react-label"
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@radix-ui/react-select";
import { Button } from "ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "ui/card"
import { Input } from "ui/input"
import { Textarea } from "ui/textarea"

export function BasicInfoSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Basic information</CardTitle>
        <CardDescription>
          View and update your personal details.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Your username (e.g., JohnDoe123)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL</Label>
            <Input id="url" placeholder="https://" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="about">About</Label>
          <Textarea
            id="about"
            placeholder="Tell us a little about yourself in the community."
            className="min-h-[100px]"
          />
        </div>
        {
          /* <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="homepage">Default Home Page</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="GroupsMe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="groupsme">GroupsMe</SelectItem>
                <SelectItem value="home">Home</SelectItem>
                <SelectItem value="profile">Profile</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div> */
        }
        <Button className="ml-auto">Save</Button>
      </CardContent>
    </Card>
  )
}
