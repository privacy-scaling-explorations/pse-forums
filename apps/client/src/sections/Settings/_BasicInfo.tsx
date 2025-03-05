import { Card } from "@/components/cards/Card";
import { Input } from "@/components/inputs/Input";
import { Select } from "@/components/inputs/Select";
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Select
          label="Default Home Page"
          items={[
            {
              value: "home",
              label: "Home",
            },
            {
              value: "profile",
              label: "Profile",
            },
          ]}
        />
        <Select
          label="Language"
          items={[
            {
              value: "en",
              label: "English",
            },
            {
              value: "fr",
              label: "French",
            },
          ]}
        />
      </div>
      <div className="py-4 flex justify-end">
        <Button>Save</Button>
      </div>
    </Card.Base>
  );
};
