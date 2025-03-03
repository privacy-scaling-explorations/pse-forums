import { Card } from "@/components/cards/Card";
import { Input } from "@/components/inputs/Input";
import { Textarea } from "@/components/inputs/Textarea";
import { Button } from "@/components/ui/Button";

export const BasicInfo = () => {
  return (
    <Card.Base className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Card.Title>Basic information</Card.Title>

        <Card.Description>
          View and update your personal details.
        </Card.Description>
      </div>
      <div className="flex flex-col gap-4 lg:grid-cols-2 lg:grid">
        <Input
          label="Username"
          placeholder="Your username (e.g., JohnDoe123)"
        />
        <Input label="URL" placeholder="https://" />
        <Textarea
          containerClassName="lg:col-span-2"
          label="About"
          placeholder="Tell us a little about yourself to the community."
        />
      </div>
      <div className="py-4 flex justify-end">
        <Button>Save</Button>
      </div>
    </Card.Base>
  );
};
