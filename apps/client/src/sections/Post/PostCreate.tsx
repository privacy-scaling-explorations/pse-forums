import { Select } from "@/components/inputs/Select";
import { Input } from "@/components/inputs/Input";
import { Tabs } from "@/components/ui/Tabs";
import { useForm } from "@tanstack/react-form";
import { capitalize } from "@/lib/format";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useSearch } from "@tanstack/react-router";
import { Textarea } from "@/components/inputs/Textarea";
import { router } from "@/lib/router";
import { PageContent } from "@/components/PageContent";
import {
  useCreateDraftMutation,
  useGetBadges,
  useCreatePostMutation,
} from "@/hooks/usePosts";
import { FileBadge } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Switch } from "@/components/inputs/Switch";
import { Mail as MailIcon } from "lucide-react";
import { Tag } from "@/components/ui/Tag";
import { useMemo, useCallback, useState } from "react";
import { type CreatePostSchema } from "@/shared/schemas/post.schema";
import { useGetUser } from "@/hooks/useAuth";

enum TabName {
  Write = "write",
  Drafts = "drafts",
}

export const PostCreate = () => {
  const createDraftMutation = useCreateDraftMutation();
  const createPostMutation = useCreatePostMutation();
  const [selectedBadge, setSelectedBadge] = useState<string[] | undefined>([]);
  const { data: user } = useGetUser();

  const search = useSearch({ from: "/_left-sidebar/post/create" });

  const { data: badges = [] } = useGetBadges();

  const communities =
    user?.communities?.map(({ id, name }: any) => ({
      value: id,
      label: name,
    })) ?? [];

  const userBadges = useMemo(() => {
    return (
      user?.badges?.map(({ id, name }: any) => ({
        value: id,
        label: name,
      })) ?? []
    );
  }, [user]);

  const badgeMap = useMemo(() => {
    const map = new Map();
    if (badges) {
      badges.forEach((badge: any) => {
        map.set(badge.id, badge.name);
      });
    }
    return map;
  }, [badges]);

  const getBadgeName = useCallback(
    (badgeId: string) => {
      return badgeMap.get(badgeId) || "Unknown";
    },
    [badgeMap],
  );

  const form = useForm<CreatePostSchema>({
    defaultValues: {
      title: "",
      content: "",
      author: {
        id: user?.id?.toString() || null,
        username: user?.username || null,
        isAnon: false,
        badges: userBadges,
      },
      isAnon: false,
      community: search?.community ? String(search.community) : undefined,
    },
    onSubmit: async ({ value }) => {
      const submissionData = {
        ...value,
        author: {
          id: user?.id?.toString() || null,
          username: user?.username || null,
          isAnon: value?.isAnon ?? false,
          badges: selectedBadge || [],
        },
      };
     
      try {
        const res = await createPostMutation.mutateAsync(submissionData);
        if (res.id) {
          router.navigate({ to: `/posts/${res.id}` });
        }
      } catch(err) {
        console.log("err", err);
      }
    },
    validators: {
      onChange: undefined
    },
  });

  const handleAddTag = useCallback(
    (tagId: string) => {
      if (selectedBadge?.includes(tagId)) {
        setSelectedBadge((prev) => prev?.filter((id) => id !== tagId));
      } else {
        setSelectedBadge((prev) => [...(prev || []), tagId]);
      }
    },
    [selectedBadge],
  );

  const handleRemoveTag = useCallback(
    (tagToRemove: string) => {
      form.setFieldValue("tags", (prev: string[] | undefined) =>
        (prev || []).filter((tag: string) => tag !== tagToRemove),
      );
    },
    [form],
  );

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
            <div className="lg:w-1/4 w-full">
              <form.Field
                name="community"
                children={(field) => (
                  <Select
                    label="Select a community"
                    items={communities}
                    onValueChange={(value) => field.handleChange(value)}
                    value={field.state.value || ""}
                    field={field}
                    disabled={user?.communities?.length === 0}
                  />
                )}
              />
            </div>

            <form.Field
              name="title"
              children={(field) => (
                <Input
                  onChange={(e) => field.handleChange(e.target.value)}
                  maxLength={200}
                  placeholder={capitalize(field.name)}
                  value={field.state.value || ""}
                  field={field}
                  showCounter={false}
                />
              )}
            />

            <form.Field
              name="content"
              children={(field) => (
                <Textarea
                  id={field.name}
                  rows={4}
                  onChange={(e) => field.handleChange(e.target.value)}
                  value={field.state.value || ""}
                  placeholder="Have something on your mind? Write it here!"
                  field={field}
                />
              )}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="lg:w-1/4 w-full">
              <Select
                header={
                  <div className="flex items-center gap-[6px] text-base-muted-foreground">
                    <FileBadge className="size-[18px]" />
                    <span className="text-base font-medium">Badges</span>
                  </div>
                }
                label="Add badges"
                items={userBadges}
                onValueChange={handleAddTag}
                value=""
              />
            </div>
            {(selectedBadge ?? [])?.length > 0 && (
              <div className="flex gap-2.5 flex-wrap">
                {(selectedBadge ?? []).map((tag) => (
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
              name="isAnon"
              children={(field) => (
                <Switch
                  label="Post as anonymous?"
                  description={
                    field.state.value
                      ? "Your name will not be displayed"
                      : `You are posting as ${user?.username}`
                  }
                  checked={field.state.value || false}
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
                  content: form.state.values.content || "",
                  title: form.state.values.title || "",
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
