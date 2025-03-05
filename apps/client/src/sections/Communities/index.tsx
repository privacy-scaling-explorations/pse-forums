import { PageContent } from "@/components/PageContent";
import { Tabs } from "@/components/ui/tempTabs";
import { AllCommunities } from "./_AllCommunities";

enum CommunityTabs {
  All = "all",
  Mod = "mod",
  Joined = "joined",
}

export const CommunitiesPage = () => {
  return (
    <PageContent title="Communities">
      <Tabs
        size="xs"
        defaultValue={CommunityTabs.All}
        items={[
          {
            id: CommunityTabs.All,
            label: "All",
            content: (
              <div className="pt-6">
                <AllCommunities />
              </div>
            ),
          },
          {
            id: CommunityTabs.Mod,
            label: "Mod",
            content: (
              <div className="pt-6">
                <AllCommunities />
              </div>
            ),
          },
          {
            id: CommunityTabs.Joined,
            label: "Joined",
            content: (
              <div className="pt-6">
                <AllCommunities />
              </div>
            ),
          },
        ]}
      />
    </PageContent>
  );
};
