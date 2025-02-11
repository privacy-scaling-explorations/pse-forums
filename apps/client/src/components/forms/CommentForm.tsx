import { useForm } from "@tanstack/react-form"
import { FieldInfo } from "c/FieldInfo"
import { getToken, rspc } from "l/rspc"
import { type CreateCommentSchema, createCommentSchema } from "l/schemas"
import type { FC, FormEvent } from "react"
import { Button } from "ui/button"
import { Textarea } from "ui/textarea"

export const CommentForm: FC<{ pid: number }> = ({ pid }) => {
  const form = useForm<CreateCommentSchema>({
    defaultValues: { content: "" },
    onSubmit: async ({ value: { content } }) => {
      getToken()
      await rspc.mutation(["comment.create", { content, pid }])
    },
    validators: { onChange: createCommentSchema },
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }

  return (
    <form
      className="w-full flex flex-col space-y-2 mt-2"
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1 className="text-xl font-semibold">New Comment</h1>
      {/* TODO */}
      {
        /*   <Button variant="outline" className="h-8">
          + Add Tags
        </Button>
        */
      }
      <form.Field
        name="content"
        children={(field) => (
          <>
            <Textarea
              id={field.name}
              className="min-h-[200px]"
              onChange={(e) => field.handleChange(e.target.value)}
              value={field.state.value}
            />
            <FieldInfo field={field} />
          </>
        )}
      />
      <form.Subscribe
        selector={({ canSubmit, isSubmitting }) => [canSubmit, isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button
            aria-busy={isSubmitting}
            className="self-end w-fit"
            disabled={!canSubmit}
          >
            Comment
          </Button>
        )}
      />
    </form>
  )
}
