import {
  Card,

} from "@/components/cards/Card";
import { Tabs } from "@/components/ui/Tabs";
import { Signin } from "./_Signin";
import { Signup } from "./_Signup";

export function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50">
      <Card.Base className="w-full max-w-md">
        <Card.Header className="space-y-1">
          <Card.Title className="text-2xl font-bold">Get started</Card.Title>
          <Card.Description>
            Create a new account to be part of the community.
          </Card.Description>
        </Card.Header>
        <Card.Content>
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
        </Card.Content>
      </Card.Base>
    </div>
  );
}
