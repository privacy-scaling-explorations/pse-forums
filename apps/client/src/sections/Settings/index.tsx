import { PageContent } from "@/components/PageContent";
import { Banner } from "@/components/ui/Banner";
import { Avatar } from "./_Avatar";
import { BasicInfo } from "./_BasicInfo";
import { OpenSession } from "./_OpenSession";
import { AuthWrapper } from "@/components/AuthWrapper";
import { Switch } from "@/components/inputs/Switch";
import { useGlobalContext } from "@/contexts/GlobalContext";

export const SettingsPage = () => {
  const { isDarkMode, setIsDarkMode } = useGlobalContext();
  return (
    <PageContent title="Settings">
      <AuthWrapper className="flex flex-col gap-6">
        <Banner.Base className="text-center">
          <Banner.Label size="sm">
            Please complete your profile to enhance your experience!
          </Banner.Label>
        </Banner.Base>
        <Avatar />
        <BasicInfo />
        <OpenSession />
      </AuthWrapper>
      <div className="max-w-[200px]">
        <Switch
          label="Dark mode"
          className="my-6"
          checked={isDarkMode}
          onChange={() => setIsDarkMode(!isDarkMode)}
        />
      </div>
    </PageContent>
  );
};
