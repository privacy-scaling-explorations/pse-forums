import { Label } from "@radix-ui/react-label"
import { useForm } from "@tanstack/react-form"
import { FieldInfo } from "c/FieldInfo"
import { Button } from "c/ui/button"
import { Input } from "c/ui/input"
import { SigninRequestDto } from "l/bindings"
import { rspc } from "l/rspc"
import type { FormEvent } from "react"
import { z } from "zod"

const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export function Signin() {
  const signinForm = useForm<SigninRequestDto>({
    defaultValues: { username: "", password: "" },
    onSubmit: async ({ value }) => {
      await rspc.mutation(["auth.signin", value])
    },
    validators: { onChange: signinSchema },
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    signinForm.handleSubmit()
  }

  return (
    <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
      <signinForm.Field
        name="username"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Username</Label>
            <Input
              id={field.name}
              name={field.name}
              placeholder="anon"
              onChange={(e) => field.handleChange(e.target.value)}
              type="text"
              required
            />
            <FieldInfo field={field} />
          </div>
        )}
      />
      <signinForm.Field
        name="password"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Password</Label>
            <Input
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              type="password"
              required
            />
            <FieldInfo field={field} />
          </div>
        )}
      />
      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-black/90"
      >
        Sign In
      </Button>
    </form>
  )
}
