import { PageContent } from "@/components/PageContent";
import { Tabs } from "@/components/ui/Tabs";
import { CommunitiesList } from "./_CommunitiesList";
import { useGlobalContext } from "@/contexts/GlobalContext";
enum CommunityTabs {
  All = "all",
  Mod = "mod",
  Joined = "joined",
}

export const CommunitiesPage = () => {
  const { isLoggedIn } = useGlobalContext();
  return (
    <PageContent title="Communities">
      <Tabs
        size="xs"
        defaultValue={CommunityTabs.All}
        items={
          [
            {
              id: CommunityTabs.All,
              label: "All",
              content: (
                <div className="pt-6">
                  <CommunitiesList view="all" />
                </div>
              ),
            },
            isLoggedIn
              ? {
                  id: CommunityTabs.Joined,
                  label: "Joined",
                  content: (
                    <div className="pt-6">
                      <CommunitiesList view="joined" />
                    </div>
                  ),
                }
              : undefined,
          ].filter(Boolean) as any
        }
      />
    </PageContent>
  );
};
