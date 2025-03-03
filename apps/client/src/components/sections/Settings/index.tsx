import { PageContent } from "@/components/PageContent";
import { Avatar } from "./_Avatar";
import { BasicInfo } from "./_BasicInfo";
import { ChangePassword } from "./_ChangePassword";
import { RecoveryCode } from "./_RecoveryCode";
import { OpenSession } from "./_OpenSession";
export const SettingsPage = () => {
  return (
    <PageContent title="Settings">
      <Avatar />
      <BasicInfo />
      <ChangePassword />
      <RecoveryCode />
      <OpenSession />
    </PageContent>
  );
};
