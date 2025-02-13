import { Button } from "ui/button"
import { Input } from "ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "ui/select"
// import { Tabs, TabsList, TabsTrigger } from "ui/tabs";
import { useField, useForm } from "@tanstack/react-form"
import { Content } from "c/Content"
import { FieldInfo } from "c/FieldInfo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "c/ui/tabs"
import { capitalize } from "l/format"
import { getToken, rspc } from "l/rspc"
import { type CreatePostSchema, createPostSchema } from "l/schemas"
import { Route } from "r/post/create"
import type { FormEvent } from "react"
import { Textarea } from "ui/textarea"

enum TabName {
  Write = "write",
  Preview = "preview",
}

export function PostForm() {
  const groups = Route.useLoaderData()

  const form = useForm<CreatePostSchema>({
    defaultValues: {
      content: "",
      gid: groups[0].id,
      title: "",
    },
    onSubmit: async ({ value }) => {
      getToken()
      await rspc.mutation(["post.create", value])
    },
    validators: { onChange: createPostSchema },
  })

  const contentField = useField<CreatePostSchema, "content">({
    form,
    name: "content",
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }

  return (
    <form className="w-full" onSubmit={(e) => handleSubmit(e)}>
      <h1 className="text-xl font-semibold mb-4">New Post</h1>
      {/* TODO: drafts */}
      {
        /*   <div className="pb-3">
        <Tabs defaultValue="new-post">
          <TabsList className="grid w-[420px] grid-cols-2">
            <TabsTrigger value="new-post">New Post</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      */
      }
      <div className="space-y-4 py-6">
        <form.Field
          name="gid"
          children={(field) => (
            <Select
              defaultValue={groups[0].id.toString()}
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
        {
          /*   <Button variant="outline" className="h-8">
          + Add Tags
        </Button>
        */
        }

        <Tabs defaultValue={TabName.Write}>
          <TabsList className="grid w-[420px] grid-cols-2">
            <TabsTrigger value={TabName.Write}>{TabName.Write}</TabsTrigger>
            <TabsTrigger value={TabName.Preview}>{TabName.Preview}</TabsTrigger>
          </TabsList>

          <TabsContent value={TabName.Write}>
            <Textarea
              id={contentField.name}
              className="min-h-[200px]"
              onChange={(e) => contentField.handleChange(e.target.value)}
              value={contentField.state.value}
            />
            <FieldInfo field={contentField} />
          </TabsContent>
          <TabsContent
            value={TabName.Preview}
            className="p-4 border rounded-md bg-gray-50"
          >
            <div className="min-h-[200px] prose">
              <Content content={contentField.state.value} />
            </div>
          </TabsContent>
        </Tabs>
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
  )
}
