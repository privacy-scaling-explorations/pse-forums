// import { AvatarSettings } from "./_Avatar"
import { BasicInfoSettings } from "./_BasicInfo"
import { ChangePwdSettings } from "./_ChangePwd"
import { OpenSessions } from "./_OpenSessions"
import { RecoveryCode } from "./_RecoveryCode"

export function Settings() {
  return (
    <div className="space-y-8">
      <h1 className="text-xl font-bold">Settings</h1>
      {/* <AvatarSettings /> */}
      <BasicInfoSettings />
      <ChangePwdSettings />
      <RecoveryCode />
      <OpenSessions />
    </div>
  )
}
