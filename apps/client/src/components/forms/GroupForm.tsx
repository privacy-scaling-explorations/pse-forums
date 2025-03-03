import { useForm } from "@tanstack/react-form"
import { FieldInfo } from "@/components/FieldInfo" 
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/cards/Card"
import { Input } from "@/components/inputs/Input"
import { Label } from "@/components/ui-old/Label"
import { RadioGroup, RadioGroupItem } from "@/components/ui-old/RadioGroup" 
import { Textarea } from "@/components/inputs/Textarea"
import { capitalize } from "@/lib/format"
import { getToken, rspc } from "@/lib/rspc"
import { type CreateGroupSchema, createGroupSchema } from "@/lib/schemas"
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
      <Card.Base>
        <Card.Header>
          <Card.Title className="text-xl">Basic Information</Card.Title>
          <Card.Description>View and update the Group details.</Card.Description>
        </Card.Header>
        <Card.Content className="space-y-6">
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
                className="ml-auto"
                disabled={!canSubmit}
              >
                Create
              </Button>
            )}
          />
        </Card.Content>
      </Card.Base>
    </form>
  )
}

// TODO: edit group
