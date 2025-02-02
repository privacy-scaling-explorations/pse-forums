// import { Checkbox } from "@radix-ui/react-checkbox"
import { Label } from "@radix-ui/react-label"
import { useForm } from "@tanstack/react-form"
import { FieldInfo } from "c/FieldInfo"
import { Button } from "c/ui/button"
import { Input } from "c/ui/input"
import { capitalize } from "l/format"
import { rspc } from "l/rspc"
import type { FormEvent } from "react"
import { z } from "zod"

// TODO: restrict schema
const signupSchema = z.object({
  confirm: z.string().min(8),
  email: z.string().email(), // let html do the validation
  password: z.string().min(8),
  username: z.string().min(3).max(20),
})
type SignupSchema = z.infer<typeof signupSchema>

export function Signup() {
  const signupForm = useForm({
    defaultValues: {
      email: "",
      username: "",
    } as SignupSchema,
    onSubmit: async ({ value: { email, password, username } }) => {
      await rspc.mutation(["auth.signup", { email, password, username }])
    },
    validators: { onChange: signupSchema },
  })

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    e.stopPropagation()
    signupForm.handleSubmit()
  }

  return (
    <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
      <signupForm.Field
        name="username"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>{capitalize(field.name)}</Label>
            <Input
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="anon"
              required
            />
            <FieldInfo field={field} />
          </div>
        )}
      />
      <signupForm.Field
        name="email"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>{capitalize(field.name)}</Label>
            <Input
              id={field.name}
              name={field.name}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="anon@mail.xyz"
              type="email"
              required
            />
            <FieldInfo field={field} />
          </div>
        )}
      />
      <signupForm.Field
        name="password"
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>{capitalize(field.name)}</Label>
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
      <signupForm.Field
        name="confirm"
        validators={{
          onChange: ({ value }) =>
            value !== signupForm.state.values.password
              ? "Passwords do not match"
              : undefined,
        }}
        children={(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Confirm Password</Label>
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
      {
        /* <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <label htmlFor="terms">I agree to the Terms and Conditions</label>
      </div> */
      }
      <Button
        type="submit"
        className="w-full bg-black text-white hover:bg-black/90"
      >
        Sign Up
      </Button>
    </form>
  )
}
