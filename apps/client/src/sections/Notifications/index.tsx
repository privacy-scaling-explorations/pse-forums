import { PageContent } from "@/components/PageContent";
import { Bell } from "lucide-react";

export const NotificationsPage = () => {
  return (
    <PageContent
      title="Notifications"
      showEmptyState
      emptyState={{
        icon: Bell,
        title: "No notifications at this time",
      }}
    >
    </PageContent>
  );
};
