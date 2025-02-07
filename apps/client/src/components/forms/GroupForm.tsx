import { useForm } from "@tanstack/react-form"
import { FieldInfo } from "c/FieldInfo"
import { Button } from "c/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "c/ui/card"
import { Input } from "c/ui/input"
import { Label } from "c/ui/label"
import { RadioGroup, RadioGroupItem } from "c/ui/radio-group"
import { Textarea } from "c/ui/textarea"
import { capitalize } from "l/format"
import { getToken, rspc } from "l/rspc"
import { type CreateGroupSchema, createGroupSchema } from "l/schemas"
import type { FormEvent } from "react"

export function CreateGroup() {
  const createGroupForm = useForm<CreateGroupSchema>({
    defaultValues: {
      createBandadaGroup: false,
      description: "",
      name: "",
    },
    onSubmit: async ({ value }) => {
      getToken()
      await rspc.mutation(["group.create", value])
    },
    validators: { onChange: createGroupSchema },
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    createGroupForm.handleSubmit()
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Basic Information</CardTitle>
          <CardDescription>View and update the Group details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <createGroupForm.Field
            name="name"
            children={(field) => (
              <>
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Group Name</Label>
                  <Input
                    id={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Group Name"
                    value={field.state.value}
                  />
                </div>
                <FieldInfo field={field} />
              </>
            )}
          />
          <createGroupForm.Field
            name="description"
            children={(field) => (
              <>
                <div className="space-y-2">
                  <Label>{capitalize(field.name)}</Label>
                  <Textarea
                    className="min-h-[100px]"
                    id={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Long description"
                    value={field.state.value}
                  />
                </div>
                <FieldInfo field={field} />
              </>
            )}
          />
          <createGroupForm.Field
            name="createBandadaGroup"
            children={(field) => (
              <RadioGroup
                className="flex flex-row space-x-4"
                defaultValue="false"
                onValueChange={(value) => field.handleChange(value === "true")}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="false" id="public" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="true" id="anon" />
                  <Label htmlFor="anon">Anonymous</Label>
                </div>
              </RadioGroup>
            )}
          />
          <createGroupForm.Subscribe
            selector={({ canSubmit, isSubmitting }) => [
              canSubmit,
              isSubmitting,
            ]}
            children={([canSubmit, isSubmitting]) => (
              <Button
                aria-busy={isSubmitting}
                disabled={!canSubmit}
                className="ml-auto"
              >
                Create
              </Button>
            )}
          />
        </CardContent>
      </Card>
    </form>
  )
}
