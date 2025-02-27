import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/cards/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Signin } from "./_Signin";
import { Signup } from "./_Signup";

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
          <Tabs
            defaultValue="signup"
            className="w-full"
            items={[
              {
                id: "signup",
                label: "Sign Up",
                content: <Signup />,
              },
              {
                id: "signin",
                label: "Sign In",
                content: <Signin />,
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
