import { Card } from "@/components/cards/Card";
import { PageContent } from "@/components/PageContent";
import { Button } from "@/components/ui/Button";
import { Link } from "@tanstack/react-router";
import { classed } from "@tw-classed/react";
import { PlusIcon } from "lucide-react";

const RowSection = classed.div("grid grid-cols-[1fr_1fr_1fr_130px_1fr] gap-2");

export const MyBadgesPage = () => {
  return (
    <PageContent
      title="My Badges"
      description="Manage and customize your badges here. You can manage visibility, add new badges, reverify or remove ones you no longer want."
    >
      <div className="flex flex-col gap-4">
        <Card.Base spacing="sm">
          <RowSection className="h-10">
            <span className="text-sm font-medium text-base-muted-foreground">
              Badge
            </span>
            <span className="text-sm font-medium text-base-muted-foreground">
              Protocol
            </span>
            <span className="text-sm font-medium text-base-muted-foreground">
              Visibility
            </span>
            <span className="text-sm font-medium text-base-muted-foreground">
              Verified
            </span>
            <span className="text-sm font-medium text-base-muted-foreground"></span>
          </RowSection>
          <Link to="/badges/new">
            <Button icon={PlusIcon} className="w-fit">
              Add new badge
            </Button>
          </Link>
        </Card.Base>
      </div>
    </PageContent>
  );
};
