import { Select } from "@/components/inputs/Select";
import { Input } from "@/components/inputs/Input";
import { Tabs } from "@/components/ui/Tabs";
import { useField, useForm } from "@tanstack/react-form";
import { capitalize } from "@/lib/format";
import { getToken, rspc } from "@/lib/rspc";
import { type CreatePostSchema, createPostSchema } from "@/lib/schemas";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useLoaderData, useSearch } from "@tanstack/react-router";
import { Textarea } from "@/components/inputs/Textarea";
import { router } from "@/lib/router";
import { PageContent } from "@/components/PageContent";
// import { communityMocks } from "@/shared/mocks/community.mocks";
import { useCreateDraftMutation, useGetBadges } from "@/hooks/usePosts";
import { FileBadge } from "lucide-react";
import { Card } from "@/components/cards/Card";
import { Switch } from "@/components/inputs/Switch";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { Mail as MailIcon } from "lucide-react";
import { Tag } from "@/components/ui/Tag";

enum TabName {
  Write = "write",
  Drafts = "drafts",
}

export const PostCreate = () => {
  const communityMocks = [] as any[];
  const groups = useLoaderData({ from: "/_left-sidebar/post/create" }) ?? [];

  const createDraftMutation = useCreateDraftMutation();
  const { user } = useGlobalContext();

  const search = useSearch({ from: "/_left-sidebar/post/create" });

  const form = useForm<CreatePostSchema>({
    defaultValues: {
      content: "",
      gid: Number(search?.community) || null,
      title: "",
      tags: [],
    },
    onSubmit: async ({ value }) => {
      getToken();
      await rspc.mutation(["post.create", value]);
    },
    validators: { onChange: createPostSchema },
  });

  const { data: badges } = useGetBadges();

  const contentField = useField<CreatePostSchema, "content">({
    form,
    name: "content",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  }

  return (
    <form className="w-full h-full pb-6" onSubmit={(e) => handleSubmit(e)}>
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
                    items={communityMocks.map(({ id, name }) => ({
                      value: id,
                      label: name,
                    }))}
                    onValueChange={(value) => field.handleChange(Number(value))}
                    value={field.state.value?.toString()}
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

            <Textarea
              id={contentField.name}
              rows={4}
              onChange={(e) => contentField.handleChange(e.target.value)}
              value={contentField.state.value}
              placeholder="Have something on your mind? Write it here!"
              field={contentField}
            />
          </div>
          <div className="flex flex-col gap-6">
            <div className="lg:w-1/4 w-full">
              <form.Field
                name="tags"
                children={(field) => (
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
                    onValueChange={(value) => {
                      const currentTags = field.state.value || [];
                      if (!currentTags.includes(value)) {
                        field.handleChange([...currentTags, value]);
                      }
                    }}
                    field={field}
                  />
                )}
              />
            </div>
            {form.state.values?.tags?.length > 0 && (
              <div className="flex gap-2.5 flex-wrap">
                {form.state.values?.tags?.map((tag) => {
                  return (
                    <Tag key={tag} onRemove={() => {}}>
                      <MailIcon className="size-4" />
                      {badges?.find(({ id }: any) => id === tag)?.name}
                    </Tag>
                  );
                })}
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
                  content: contentField.state.value,
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
              children={([_canSubmit, isSubmitting]) => (
                <Button
                  aria-busy={isSubmitting}
                  disabled={isSubmitting}
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
