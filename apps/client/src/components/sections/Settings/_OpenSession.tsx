import { Card } from "@/components/cards/Card";

export const OpenSession = () => {
  return (
    <Card.Base className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Card.Title>Open sessions</Card.Title>

        <Card.Description>
          Update your password to keep your account secure.
        </Card.Description>
      </div>
      <div className="flex flex-col gap-4"></div>
    </Card.Base>
  );
};
