import { Labels } from "@/components/ui/Labels";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Pen as PenIcon, LogOut as LogOutIcon } from "lucide-react";
import { PageContent } from "@/components/PageContent";
import { Banner } from "@/components/ui/Banner";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { useNavigate } from "@tanstack/react-router";
import { InfoCard } from "@/components/ui/InfoCard";



export const ProfilePage = () => {
  const { user, setIsLoggedIn } = useGlobalContext();
  const navigate = useNavigate();
  return (
    <PageContent className="flex flex-col gap-6">
      <Labels.PageTitle>Profile</Labels.PageTitle>
      <Banner.Base className="flex flex-col gap-2 text-left">
        <Banner.Label>
          You have not set a recovery code. If you lose your password, you will
          not be able to recover your account.
        </Banner.Label>
        <div className="ml-auto">
          <Button variant="error" className="font-medium">
            Generate recovery code
          </Button>
        </div>
      </Banner.Base>
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <Avatar size="xl" src={user?.avatar} />
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-semibold font-inter text-base-foreground">
              John Doe
            </h2>
            <div className="flex items-center gap-1">
              <span className="text-xs font-inter text-black-secondary">
                Standard
              </span>
              <Badge variant="secondary">uid: 123</Badge>
            </div>
            <span className="text-xs font-inter text-black-secondary">
              Created 2024-01-01
            </span>
          </div>
        </div>
        <span className="text-sm font-inter text-black-secondary">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
          voluptatum quas ut in distinctio dolores dolor saepe quidem. Ullam
          illum in sint ipsum facilis odit voluptas suscipit, similique pariatur
          nulla!
        </span>
        <div className="flex gap-2">
          <Button icon={PenIcon} variant="outline">
            Edit Profile
          </Button>
          <Button
            icon={LogOutIcon}
            variant="outline"
            onClick={() => {
              setIsLoggedIn(false);
              navigate({ to: "/" });
            }}
          >
            Sign Out
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-5">
        <InfoCard label="Following" value="1" />
        <InfoCard label="Followers" value="2.344" />
        <InfoCard label="Posts" value="123" />
        <InfoCard label="Solos" value="123" />
        <InfoCard
          label="Feeds"
          value="123"
          className="col-span-2 lg:col-span-1"
        />
      </div>
    </PageContent>
  );
};
