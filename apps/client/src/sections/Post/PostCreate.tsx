import { Select } from "@/components/inputs/Select";
import { Input } from "@/components/inputs/Input";
import { Tabs } from "@/components/ui/Tabs";
import { useField, useForm } from "@tanstack/react-form";
import { capitalize } from "@/lib/format";
import { getToken, rspc } from "@/lib/rspc";
import { type CreatePostSchema, createPostSchema } from "@/lib/schemas";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useSearch } from "@tanstack/react-router";
import { Textarea } from "@/components/inputs/Textarea";
import { router } from "@/lib/router";
import { PageContent } from "@/components/PageContent";
import { useCreateDraftMutation, useGetBadges } from "@/hooks/usePosts";
import { FileBadge } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Switch } from "@/components/inputs/Switch";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { Mail as MailIcon } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { useGetCommunities } from "@/hooks/useCommunities";
import { useMemo, useState, useCallback } from "react";

enum TabName {
  Write = "write",
  Drafts = "drafts",
}

export const PostCreate = () => {
  const createDraftMutation = useCreateDraftMutation();
  const { user } = useGlobalContext();

  const search = useSearch({ from: "/_left-sidebar/post/create" });

  const { data: communities = [] } = useGetCommunities();
  const { data: badges = [] } = useGetBadges();

  // Create a separate state to manage tags to avoid form update conflicts
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Memoize badge lookup for performance
  const badgeMap = useMemo(() => {
    const map = new Map();
    if (badges) {
      badges.forEach((badge: any) => {
        map.set(badge.id, badge.name);
      });
    }
    return map;
  }, [badges]);

  // Get badge name by id
  const getBadgeName = useCallback(
    (badgeId: string) => {
      return badgeMap.get(badgeId) || "Unknown";
    },
    [badgeMap],
  );

  // Create the form with CreatePostSchema
  const form = useForm<CreatePostSchema>({
    defaultValues: {
      content: "",
      title: "",
      gid: search?.community ? Number(search.community) : null,
      tags: [],
      postAsAnonymous: false,
    },
    onSubmit: async ({ value }) => {
      // Ensure tags from separate state are included in submission
      const submissionData = {
        ...value,
        tags: selectedTags,
      };
      getToken();
      await rspc.mutation(["post.create", submissionData]);
    },
    validators: { onChange: createPostSchema },
  });

  // No need to use a separate content field since we're using form.Field directly now

  const handleAddTag = useCallback((tagId: string) => {
    setSelectedTags((prev) => {
      if (!prev.includes(tagId)) {
        return [...prev, tagId];
      }
      return prev;
    });
  }, []);

  const handleRemoveTag = useCallback((tagToRemove: string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }

  return (
    <form className="w-full h-full pb-6" onSubmit={handleSubmit}>
      <PageContent title="New Post" className="flex flex-col h-full">
        <Tabs
          defaultValue={TabName.Write}
          minWidth={170}
          items={[
            {
              id: TabName.Write,
              label: "New Post",
            },
            {
              id: TabName.Drafts,
              label: "Drafts",
              onClick: () => {
                router.navigate({ to: "/post/drafts" });
              },
            },
          ]}
        />

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="lg:w-1/5 w-full">
              <form.Field
                name="gid"
                children={(field) => (
                  <Select
                    label="Select a community"
                    items={communities?.map(({ id, name }: any) => ({
                      value: id,
                      label: name,
                    }))}
                    onValueChange={(value) => field.handleChange(Number(value))}
                    value={field.state.value?.toString() || ""}
                    field={field}
                  />
                )}
              />
            </div>

            <form.Field
              name="title"
              children={(field) => (
                <>
                  <Input
                    onChange={(e) => field.handleChange(e.target.value)}
                    maxLength={200}
                    placeholder={capitalize(field.name)}
                    value={field.state.value}
                    field={field}
                    showCounter
                  />
                </>
              )}
            />

            <form.Field
              name="content"
              children={(field) => (
                <Textarea
                  id={field.name}
                  rows={4}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value}
                  placeholder="Have something on your mind? Write it here!"
                  field={field}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="lg:w-1/4 w-full">
              {/* Badge selection without using form.Field */}
              <Select
                header={
                  <div className="flex items-center gap-[6px] text-base-muted-foreground">
                    <FileBadge className="size-[18px]" />
                    <span className="text-base font-medium">Badges</span>
                  </div>
                }
                label="Add badges"
                items={badges?.map(({ id, name }: any) => ({
                  value: id,
                  label: (
                    <div className="flex items-center gap-1">
                      <MailIcon className="size-4" />
                      <span>{name}</span>
                    </div>
                  ),
                }))}
                onValueChange={handleAddTag}
                value=""
              />
            </div>
            {selectedTags.length > 0 && (
              <div className="flex gap-2.5 flex-wrap">
                {selectedTags.map((tag) => (
                  <Tag key={tag} onRemove={() => handleRemoveTag(tag)}>
                    <MailIcon className="size-4" />
                    {getBadgeName(tag)}
                  </Tag>
                ))}
              </div>
            )}
          </div>
        </div>

        <Card.Base variant="secondary" className="mt-auto">
          <div className="flex justify-end gap-2.5">
            <form.Field
              name="postAsAnonymous"
              children={(field) => (
                <Switch
                  label="Post as anonymous?"
                  description={
                    field.state.value
                      ? "Your name will not be displayed"
                      : `You are posting as ${user?.name}`
                  }
                  checked={!!field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  field={field}
                />
              )}
            />
          </div>
          <div className="flex justify-end gap-2.5">
            <Button
              variant="ghost"
              type="button"
              onClick={() => {
                createDraftMutation.mutate({
                  content: form.state.values.content,
                  title: form.state.values.title,
                });
              }}
            >
              Save as draft
            </Button>
            <form.Subscribe
              selector={({ canSubmit, isSubmitting }) => [
                canSubmit,
                isSubmitting,
              ]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  aria-busy={isSubmitting}
                  disabled={isSubmitting || !canSubmit}
                  className="min-w-[160px]"
                >
                  Post
                </Button>
              )}
            />
          </div>
        </Card.Base>
      </PageContent>
    </form>
  );
};
