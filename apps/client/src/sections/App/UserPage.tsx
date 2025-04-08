import { PageContent } from "@/components/PageContent";
import { useGetProfile } from "@/hooks/useProfile";
import { useParams } from "@tanstack/react-router";
import { Avatar } from "@/components/Avatar";
import { formatDate } from "@/lib/utils";
import {
  PencilLine as PencilIcon,
  FileBadge as FileBadgeIcon,
  CircleUser as CircleUserIcon,
} from "lucide-react";
import { InfoCard } from "@/components/ui/InfoCard";
import { Card } from "@/components/cards/Card";
import { Badge } from "@/components/ui/Badge";

export function UserPage() {
  const userParams = useParams({ from: "/_left-sidebar/user/$username" });

  const username = userParams.username;

  const { data: profile } = useGetProfile({ username });

  const hasBadges = profile?.badges.length > 0;

  return (
    <PageContent>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <Avatar src={profile?.avatar || ""} size="xl" />
            <div className="flex flex-col gap-[6px]">
              <h1 className="text-2xl font-bold">{profile?.username}</h1>
              <div className="flex items-center gap-2">
                <CircleUserIcon className="size-4 text-base-muted-foreground" />
                <span className="text-base-muted-foreground font-inter font-normal text-sm">
                  UID: -
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PencilIcon className="size-4 text-base-muted-foreground" />
                <span className="text-base-muted-foreground font-inter font-normal text-sm">
                  Created {formatDate(profile?.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-base-muted-foreground font-inter font-normal text-sm">
              {profile?.bio}
            </span>
          </div>
          <div className="flex gap-10">
            <InfoCard
              label="Following"
              value={0}
              variant="base"
              fontSize="lg"
            />
            <InfoCard
              label="Followers"
              value={0}
              variant="base"
              fontSize="lg"
            />
            <InfoCard label="Posts" value={0} variant="base" fontSize="lg" />
            <InfoCard label="Comments" value={0} variant="base" fontSize="lg" />
            <InfoCard
              label="Communities"
              value={0}
              variant="base"
              fontSize="lg"
            />
          </div>
        </div>
        <Card.Base spacing="sm" className="lg:w-2/5">
          <div className="flex flex-col gap-3">
            <div className="flex gap-1 items-center">
              <FileBadgeIcon className="size-5 text-base-foreground" />
              <span className="font-semibold text-base-foreground text-xl ">
                {`${profile?.username}'s Badges`}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {hasBadges ? (
                profile?.badges.map((badge: any) => (
                  <div key={badge.id}>
                    <Badge variant="secondary">{badge.name}</Badge>
                  </div>
                ))
              ) : (
                <span className="text-base-muted-foreground font-inter font-normal text-sm">
                  No badges yet
                </span>
              )}
            </div>
          </div>
        </Card.Base>
      </div>
    </PageContent>
  );
}
