import { Label } from "@radix-ui/react-label"
import { useForm } from "@tanstack/react-form"
import { FieldInfo } from "c/FieldInfo"
import { useAuth } from "h/useAuth"
import type { ProfileDto } from "l/bindings"
import { capitalize } from "l/format"
import { getToken, rspc } from "l/rspc"
import { type BasicInfoSchema, basicInfoSchema } from "l/schemas"
import type { FC, FormEvent } from "react"
import { Button } from "ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "ui/card"
import { Input } from "ui/input"
import { Textarea } from "ui/textarea"

export const BasicInfoSettings: FC<ProfileDto> = ({
  about,
  username,
  url,
  id,
}) => {
  const { setAuth } = useAuth()
  const basicInfoForm = useForm<BasicInfoSchema>({
    defaultValues: {
      about,
      username,
      url,
    },
    onSubmit: async ({ value }) => {
      getToken()
      const { profile, jwt: token } = await rspc.mutation([
        "profile.update",
        { id, ...value },
      ])

      if (token !== null && token !== undefined) {
        setAuth({ username: profile.username, token, uid: id })
      }
    },
    validators: { onChange: basicInfoSchema },
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    basicInfoForm.handleSubmit()
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Basic information</CardTitle>
          <CardDescription>
            View and update your personal details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <basicInfoForm.Field
              name="username"
              children={(field) => (
                <>
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>{capitalize(field.name)}</Label>
                    <Input
                      id={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder={username}
                      value={field.state.value}
                    />
                  </div>
                  <FieldInfo field={field} />
                </>
              )}
            />
            <basicInfoForm.Field
              name="url"
              children={(field) => (
                <>
                  <div className="space-y-2">
                    <Label htmlFor={field.name}>URL</Label>
                    <Input
                      id={field.name}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="https://domain.com"
                      value={field.state.value}
                    />
                  </div>
                  <FieldInfo field={field} />
                </>
              )}
            />
          </div>
          <basicInfoForm.Field
            name="about"
            children={(field) => (
              <>
                <div className="space-y-2">
                  <Label htmlFor={field.name}>{capitalize(field.name)}</Label>
                  <Textarea
                    className="min-h-[100px]"
                    id={field.name}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Tell us a little about yourself in the community."
                    value={field.state.value}
                  />
                </div>
                <FieldInfo field={field} />
                <br />
              </>
            )}
          />
          <basicInfoForm.Subscribe
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
                Save
              </Button>
            )}
          />
        </CardContent>
      </Card>
    </form>
  )
}
