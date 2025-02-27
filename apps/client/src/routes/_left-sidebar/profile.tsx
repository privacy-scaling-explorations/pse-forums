import { createFileRoute } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Labels } from "@/components/ui/Labels";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pen as PenIcon, LogOut as LogOutIcon } from "lucide-react";

export const Route = createFileRoute("/_left-sidebar/profile")({
  component: ProfilePageView,
});

const InfoCard = ({ label, value, className }: { label: string; value: string, className?: string }) => {
  return (
    <div className={cn("flex flex-col p-2 rounded-md bg-white-light text-center", className)}>
      <span className="text-sm font-inter text-black font-bold">{value}</span>

      <span className="text-xs font-inter font-medium text-[#71717A]">
        {label}
      </span>
    </div>
  );
};
function ProfilePageView() {
  return (
    <div className="flex flex-col gap-6">
      <Labels.PageTitle>Profile</Labels.PageTitle>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Avatar size="xl" />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold font-inter text-black">
              John Doe
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-xs font-inter text-[#71717A]">
                Standard
              </span>
              <Badge variant="white">uid: 123</Badge>
            </div>
            <span className="text-xs font-inter text-[#71717A]">
              Created 2024-01-01
            </span>
          </div>
        </div>
        <span className="text-sm font-inter text-[#71717A]">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
          voluptatum quas ut in distinctio dolores dolor saepe quidem. Ullam
          illum in sint ipsum facilis odit voluptas suscipit, similique pariatur
          nulla!
        </span>
        <div className="flex gap-2">
          <Button icon={PenIcon} variant="outline">
            Edit Profile
          </Button>
          <Button icon={LogOutIcon} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-5">
        <InfoCard label="Following" value="1" />
        <InfoCard label="Followers" value="2.344" />
        <InfoCard label="Posts" value="123" />
        <InfoCard label="Solos" value="123" />
        <InfoCard label="Feeds" value="123" className="col-span-2 lg:col-span-1" />
      </div>
    </div>
  );
}
