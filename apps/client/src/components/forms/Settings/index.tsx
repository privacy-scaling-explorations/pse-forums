// import { AvatarSettings } from "./_Avatar"
import { useAuth } from "h/useAuth"
import { useQuery } from "l/rspc"
import { BasicInfoSettings } from "./_BasicInfo"
import { ChangePwdSettings } from "./_ChangePwd"
import { OpenSessions } from "./_OpenSessions"
import { RecoveryCode } from "./_RecoveryCode"

export function Settings() {
  const { auth } = useAuth()
  const { data, error, isLoading } = useQuery(
    // @ts-ignore TODO: fix, what need to get inner?
    ["profile.read", auth.mapOrSync("", ({ username }) => username.inner)],
    {
      enabled: auth.isSome(),
    },
  )

  if (error) return <div>Error: {error.message}</div>
  if (data === undefined || isLoading) return <div>Loading...</div>
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Settings</h1>
      {/* <AvatarSettings /> */}
      <BasicInfoSettings {...data} />
      <ChangePwdSettings />
      <RecoveryCode />
      <OpenSessions />
    </div>
  )
}
