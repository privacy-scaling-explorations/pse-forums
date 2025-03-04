import { PageContent } from "@/components/PageContent";
import { router } from "@/lib/router";
import { PencilLine as PencilLineIcon } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";

export const PostDrafts = () => {
  return (
    <PageContent
      title="Drafts"
      emptyState={{
        icon: PencilLineIcon,
        title: "Keep your ideas safe until you're ready",
        description:
          "Save your drafts here and come back anytime to edit or share them when you're ready to post.",
      }}
      showEmptyState
    >
      <Tabs
        defaultValue="drafts"
        items={[
          {
            id: "create",
            label: "New Post",
            onClick: () => {
              router.navigate({ to: "/post/create" });
            },
          },
          {
            id: "drafts",
            label: "Drafts",
          },
        ]}
      />
    </PageContent>
  );
};
