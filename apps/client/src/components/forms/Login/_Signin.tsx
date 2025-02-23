import { Label } from "@radix-ui/react-label"
import { useForm } from "@tanstack/react-form"
import { useNavigate } from "@tanstack/react-router"
import { FieldInfo } from "c/FieldInfo"
import { Button } from "c/ui/button"
import { Input } from "c/ui/input"
import { useAuth } from "h/useAuth"
import type { SigninRequestDto } from "l/bindings"
import { rspc } from "l/rspc"
import { type SigninSchema, signinSchema } from "l/schemas"
import { type FormEvent, useCallback } from "react"

export function Signin() {
  const navigate = useNavigate()
  const { setAuth } = useAuth()

  const handleAuth = useCallback(
    async ({ value }: { value: SigninSchema }) => {
      const {
        user: { id, username },
        token,
      } = await rspc.mutation(["auth.signin", value])

      setAuth({
        token,
        uid: id,
        username,
      })

      navigate({ to: "/" })
    },
    [navigate, setAuth],
  )

  const signinForm = useForm<SigninRequestDto>({
    defaultValues: { username: "", password: "" },
    onSubmit: handleAuth,
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
              value={field.state.value}
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
              value={field.state.value}
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
