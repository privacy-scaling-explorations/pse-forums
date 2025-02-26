import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "c/cards/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "ui/tabs"
import { Signin } from "./_Signin"
import { Signup } from "./_Signup"

export function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Get started</CardTitle>
          <CardDescription>
            Create a new account to be part of the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signup" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              <Signup />
            </TabsContent>
            <TabsContent value="signin">
              <Signin />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
