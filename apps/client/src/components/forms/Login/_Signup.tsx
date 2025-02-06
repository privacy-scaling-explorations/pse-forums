// import { Checkbox } from "@radix-ui/react-checkbox"
import { Label } from "@radix-ui/react-label"
import { useForm } from "@tanstack/react-form"
import { useNavigate } from "@tanstack/react-router"
import { FieldInfo } from "c/FieldInfo"
import { Button } from "c/ui/button"
import { Input } from "c/ui/input"
import { useAuth } from "h/useAuth"
import { capitalize } from "l/format"
import { rspc } from "l/rspc"
import { type SignupSchema, signupSchema } from "l/schemas"
import { type FormEvent, useCallback } from "react"

export function Signup() {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const handleAuth = useCallback(
    async ({
      value: { email, password, username },
    }: {
      value: SignupSchema
    }) => {
      const {
        user: { id },
        token,
      } = await rspc.mutation(["auth.signup", { email, password, username }])

      setAuth({
        token,
        uid: id,
        username,
      })

      navigate({ to: "/" })
    },
    [navigate, setAuth],
  )

  const signupForm = useForm({
    defaultValues: {
      email: "",
      username: "",
    } as SignupSchema,
    onSubmit: handleAuth,
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
              value={field.state.value}
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
              value={field.state.value}
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
