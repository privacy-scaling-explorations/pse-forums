import { Avatar } from "c/Avatar"
import { Card, CardContent, CardHeader, CardTitle } from "c/ui/card"

const users = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
]

export const Users = () => (
  <Card className="bg-gray-50">
    <CardHeader>
      <CardTitle className="self-start text-xs">ACTIVE USERS</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-6 gap-2">
        {users.map((u) => <Avatar key={u} username={u} />)}
      </div>
    </CardContent>
  </Card>
)
