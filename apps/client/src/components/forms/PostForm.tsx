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
import { Content } from "@/components/Content";
import { FieldInfo } from "@/components/FieldInfo";
import { capitalize } from "@/lib/format";
import { getToken, rspc } from "@/lib/rspc";
import { type CreatePostSchema, createPostSchema } from "@/lib/schemas";
import type { FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { useLoaderData } from "@tanstack/react-router";
import { Labels } from "@/components/ui/Labels";
import { Textarea } from "@/components/inputs/Textarea";
import { router } from "@/lib/router";

enum TabName {
  Write = "write",
  Preview = "preview",
}

export const PostForm = () => {
  const groups = useLoaderData({ from: "/_app/post/create" }) ?? [];

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
      <Labels.PageTitle>New Post</Labels.PageTitle>
      {/* TODO: drafts */}
      {/*   <div className="pb-3">
        <Tabs defaultValue="new-post">
          <TabsList className="grid w-[420px] grid-cols-2">
            <TabsTrigger value="new-post">New Post</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      */}
      <div className="space-y-4 py-6">
        <form.Field
          name="gid"
          children={(field) => (
            <Select
              defaultValue={groups[0]?.id?.toString()}
              onValueChange={(value) => field.handleChange(Number(value))}
              value={field.state.value.toString()}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a Group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map(({ id, name }) => (
                  <SelectItem key={id} value={String(id)}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        <div className="space-y-2">
          <div className="relative w-fit">
            <form.Field
              name="title"
              children={(field) => (
                <>
                  <Input
                    className="w-[520px]"
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
        {/* TODO */}
        {/*   <Button variant="outline" className="h-8">
          + Add Tags
        </Button>
        */}

        <Tabs
          defaultValue={TabName.Write}
          items={[
            {
              id: TabName.Write,
              label: TabName.Write,
              content: (
                <>
                  <Textarea
                    id={contentField.name}
                    className="min-h-[200px]"
                    onChange={(e) => contentField.handleChange(e.target.value)}
                    value={contentField.state.value}
                  />
                  <FieldInfo field={contentField} />
                </>
              ),
            },
            {
              id: TabName.Preview,
              label: TabName.Preview,
              onClick: () => {
                console.log("clicked");
                router.navigate({ to: "/post/drafts" });
              },
              content: (
                <>
                  <div className="min-h-[200px] prose">
                    <Content content={contentField.state.value} />
                  </div>
                </>
              ),
            },
          ]}
        />
      </div>
      <div className="flex justify-end gap-2">
        {/* TODO: drafts */}
        {/*<Button variant="outline">Save Draft</Button>*/}
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
}
