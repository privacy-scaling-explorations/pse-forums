import { Button } from "@/components/ui/Button";
import { Card } from "@/components/cards/Card";
import { classed } from "@tw-classed/react";

const SessionTableWrapper = classed.div(
  "h-10 flex items-center lg:grid lg:grid-cols-[1fr_150px_90px] gap-2",
);

const sessionMockData = [
  {
    id: 1,
    session: "Session 1",
    device: "Device 1",
    key: "1234567890",
    status: "Active",
  },
  {
    id: 2,
    session: "Session 2",
    device: "Device 2",
    key: "1234567890",
    status: "Active",
  },
];

export const OpenSession = () => {
  return (
    <Card.Base className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <Card.Title>Open sessions</Card.Title>
        <Card.Description>
          Update your password to keep your account secure.
        </Card.Description>
      </div>
      <div className="flex flex-col">
        <SessionTableWrapper className="border-b border-b-gray">
          <span className="text-sm font-medium text-black-secondary">
            Session
          </span>
          <span className="text-sm font-medium text-black-secondary">
            Device
          </span>
          <span></span>
        </SessionTableWrapper>
        {sessionMockData.map((session) => (
          <SessionTableWrapper
            key={session.id}
            className="border-b border-b-gray h-[52px]"
          >
            <span className="text-sm text-black font-medium">
              {session.key}
            </span>
            <span className="text-sm text-black">{session.status}</span>
            <div>
              <Button variant="outline" className="!flex !w-full">
                Sign Out
              </Button>
            </div>
          </SessionTableWrapper>
        ))}
      </div>
    </Card.Base>
  );
};
