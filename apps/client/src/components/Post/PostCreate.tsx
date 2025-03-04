import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/inputs/Select";
import { Input } from "@/components/inputs/Input";
import { Tabs } from "@/components/ui/Tabs";
import { useField, useForm } from "@tanstack/react-form";
import { FieldInfo } from "@/components/FieldInfo";
import { capitalize } from "@/lib/format";
import { getToken, rspc } from "@/lib/rspc";
import { type CreatePostSchema, createPostSchema } from "@/lib/schemas";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useLoaderData } from "@tanstack/react-router";
import { Textarea } from "@/components/inputs/Textarea";
import { router } from "@/lib/router";
import { PageContent } from "../PageContent";

enum TabName {
  Write = "write",
  Drafts = "drafts",
}

export const PostCreate = () => {
  const groups = useLoaderData({ from: "/_left-sidebar/post/create" }) ?? [];

  const form = useForm<CreatePostSchema>({
    defaultValues: {
      content: "",
      gid: /*groups?.[0]?.id */ 1,
      title: "",
    },
    onSubmit: async ({ value }) => {
      getToken();
      await rspc.mutation(["post.create", value]);
    },
    validators: { onChange: createPostSchema },
  });

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
    <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
      <PageContent title="New Post">
        <Tabs
          defaultValue={TabName.Write}
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

        <div className="space-y-2">
          <div className="relative">
            <form.Field
              name="title"
              children={(field) => (
                <>
                  <Input
                    onChange={(e) => field.handleChange(e.target.value)}
                    maxLength={200}
                    placeholder={capitalize(field.name)}
                    value={field.state.value}
                  />
                  <span className="absolute right-3 top-2.5 text-sm text-muted-foreground">
                    {form.state.values.title.length}/50
                  </span>
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
        </div>
        <FieldInfo field={contentField} />

        <Textarea
          id={contentField.name}
          rows={4}
          onChange={(e) => contentField.handleChange(e.target.value)}
          value={contentField.state.value}
          placeholder="Have something on your mind? Write it here!"
        />
      </PageContent>

      <div className="space-y-4 py-6">
        <form.Field
          name="gid"
          children={(field) => (
            <Select
              label="Select a Group"
              items={groups.map(({ id, name }) => ({
                value: id,
                label: name,
              }))}
              defaultValue={groups[0]?.id?.toString()}
              onValueChange={(value) => field.handleChange(Number(value))}
              value={field.state.value.toString()}
            />
          )}
        />
      </div>
      <div className="flex justify-end gap-2">
        <form.Subscribe
          selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button aria-busy={isSubmitting} disabled={!canSubmit}>
              Post
            </Button>
          )}
        />
      </div>
    </form>
  );
};
