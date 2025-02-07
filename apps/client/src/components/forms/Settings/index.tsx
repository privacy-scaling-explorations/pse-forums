import { useAuth } from "h/useAuth"
import { useQuery } from "l/rspc"
import { BasicInfoSettings } from "./_BasicInfo"
// import { AvatarSettings } from "./_Avatar"
// import { ChangePwdSettings } from "./_ChangePwd";
// import { OpenSessions } from "./_OpenSessions";
// import { RecoveryCode } from "./_RecoveryCode";

export function Settings() {
  const { auth } = useAuth()
  const { data, error, isLoading } = useQuery(
    // @ts-ignore TODO fix typings ???
    ["profile.read", auth.inner?.username],
    {
      enabled: auth.isSome(),
    },
  )

  if (error) return <div>Error: {error.message}</div>
  if (data === undefined || isLoading || auth.isNone()) {
    return <div>Loading...</div>
  }
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Settings</h1>
      {/* <AvatarSettings /> */}
      <BasicInfoSettings {...data} />
      {/* <ChangePwdSettings /> */}
      {/* <RecoveryCode /> */}
      {/* <OpenSessions /> */}
    </div>
  )
}
