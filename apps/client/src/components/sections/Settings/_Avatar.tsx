import { Card } from "@/components/cards/Card";

export const Avatar = () => {
  return (
    <Card.Base className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Card.Title>Avatar</Card.Title>

        <Card.Description>
          The image everyone will see when visiting your profile.
        </Card.Description>
      </div>
    </Card.Base>
  );
};
