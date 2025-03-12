import { PageContent } from "@/components/PageContent";
import { router } from "@/lib/router";
import { PencilLine as PencilLineIcon } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { useGetDrafts, useRemoveDraft } from "@/hooks/usePosts";
import { TimeSince } from "@/components/ui/TimeSince";
import { Trash2 as TrashIcon } from "lucide-react";

export const PostDrafts = () => {
  const { data: drafts = [], isLoading, refetch: refetchDrafts } = useGetDrafts();

  const removeDraftMutation = useRemoveDraft();

  const hasDrafts = drafts?.length > 0 && !isLoading;

  return (
    <PageContent
      title="Drafts"
      emptyState={{
        icon: PencilLineIcon,
        title: "Keep your ideas safe until you're ready",
        description:
          "Save your drafts here and come back anytime to edit or share them when you're ready to post.",
      }}
      showEmptyState={!hasDrafts}
    >
      <Tabs
        defaultValue="drafts"
        items={[
          {
            id: "create",
            label: "New Post",
            onClick: () => {
              router.navigate({
                to: "/post/create",
                search: { community: undefined },
              });
            },
          },
          {
            id: "drafts",
            label: "Drafts",
          },
        ]}
      />
      {hasDrafts && (
        <div className="flex flex-col gap-4">
          {drafts.map((draft) => (
            <div
              className="relative flex flex-col gap-1 pb-4 border-b border-base-border"
              key={draft.id}
            >
              <h2 className="text-sm font-medium text-base-foreground">
                {draft.title}
              </h2>
              <TimeSince
                isoDateTime={new Date(draft.createdAt).toISOString()}
              />
              <button
                className="absolute top-0 right-0"
                type="button"
                onClick={async () => {
                  await removeDraftMutation.mutateAsync(draft.id);
                  await refetchDrafts();
                }}
              >
                <TrashIcon className="size-4 text-muted-foreground " />
              </button>
            </div>
          ))}
        </div>
      )}
    </PageContent>
  );
};
