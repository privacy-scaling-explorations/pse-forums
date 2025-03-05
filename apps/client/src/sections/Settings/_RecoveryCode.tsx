import { Card } from "@/components/cards/Card";
import { Input } from "@/components/inputs/Input";
import { Button } from "@/components/ui/Button";

export const RecoveryCode = () => {
  return (
    <Card.Base className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Card.Title>Recovery code</Card.Title>

        <Card.Description>
          Update your password to keep your account secure.
        </Card.Description>
      </div>
      <div className="flex flex-col gap-4">
        <Input
          label="Password"
          description="You must input your password to generate or reset your recovery code."
        />
      </div>
      <div className="py-4 flex justify-end">
        <Button>Generate recovery code</Button>
      </div>
    </Card.Base>
  );
};
