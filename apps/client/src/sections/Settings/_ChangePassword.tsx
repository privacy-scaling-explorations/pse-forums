import { Card } from "@/components/cards/Card";
import { Input } from "@/components/inputs/Input";
import { Button } from "@/components/ui/tempButton";

export const ChangePassword = () => {
  return (
    <Card.Base className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Card.Title>Change password</Card.Title>

        <Card.Description>
          Update your password to keep your account secure.
        </Card.Description>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="Old password"
          placeholder="Enter your current password."
        />
        <Input
          label="New password"
          placeholder="Choose a strong new password."
        />
        <Input
          label="Re-enter password"
          placeholder="Confirm your new password."
        />
      </div>
      <div className="py-4 flex justify-end">
        <Button>Save</Button>
      </div>
    </Card.Base>
  );
};
