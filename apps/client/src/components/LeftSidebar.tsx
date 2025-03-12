import { Link } from "@tanstack/react-router";
import { CreateGroup } from "@/components/CreateGroup";
import { Signout } from "@/components/Signout";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@/lib/rspc";
import { Home as HomeIcon, LucideIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MAIN_NAV_ITEMS } from "settings";
import { cn } from "@/lib/utils";
import { Accordion } from "@/components/Accordion";
import { membershipMocks } from "mocks/membershipMocks";
import { Avatar } from "@/components/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Switch } from "./inputs/Switch";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { AuthWrapper } from "./AuthWrapper";
const renderNavItems = (
  _items: (typeof MAIN_NAV_ITEMS)[keyof typeof MAIN_NAV_ITEMS],
) =>
  _items.map((item) => (
    <NavItem
      to={item.to}
      key={item.title}
      title={item.title}
      icon={item.icon}
      badge={item.badge}
    />
  ));

const renderStartItems = () => renderNavItems(MAIN_NAV_ITEMS.start);
const renderEndItems = () => renderNavItems(MAIN_NAV_ITEMS.end);

const NavItem = ({
  title,
  to,
  icon,
  badge,
}: {
  title: string;
  to: string;
  icon: LucideIcon;
  badge?: string;
}) => {
  const Icon = icon;

  return (
    <Link
      to={to}
      key={title}
      className={cn(
        "text-sm font-inter font-medium leading-5 text-base-muted-foreground cursor-pointer outline-none focus:outline-none focus:ring-0 focus:ring-offset-0",
        "duration-200 hover:bg-muted hover:text-base-primary",
        "flex items-center gap-2 rounded-md h-9 py-2 w-full p-2",
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className=" text-base" size={16} />
        <span>{title}</span>
      </div>
      {badge && (
        <div className="ml-auto">
          <Badge rounded="full" className="!ml-auto">
            {badge}
          </Badge>
        </div>
      )}
    </Link>
  );
};

const SidebarContent = () => {
  const { auth } = useAuth();
  // @ts-ignore FIXME
  const { data: user } = useQuery(["user.read", auth?.inner?.username], {
    enabled: auth?.isSome(),
  });

  return (
    <nav
      aria-label="Sidebar Navigation"
      className="flex flex-col divide-y-[1px] divide-sidebar-border"
    >
      <div className="space-y-1 py-6">
        <NavItem title="Home" to="/" icon={HomeIcon} />
        {renderStartItems()}
        {auth?.mapSync(renderStartItems)}
      </div>
      <Accordion
        className="py-6"
        items={[
          {
            label: "MY COMMUNITIES",
            children: (
              <div className="flex flex-col">
                {membershipMocks.map(({ id, name, logo }) => (
                  <Link
                    key={id}
                    to="/communities/$id"
                    className="flex gap-2 items-center py-2 px-3"
                    params={{ id: `${id}` }}
                  >
                    <Avatar className="!size-[32px] !rounded-lg" src={logo} />
                    <span className="font-semibold font-inter text-sm text-sidebar-foreground line-clamp-1">
                      {name} ss
                    </span>
                  </Link>
                ))}
              </div>
            ),
          },
        ]}
      />

      {user !== undefined && (
        <div className="space-y-2 py-6">
          <div className="w-full justify-start flex items-center space-x-3 text-sm">
            <Users className="w-5 h-5" />
            <span>My Groups</span>
          </div>
          {user.memberships.map(([gid, name]) => (
            <Link
              key={gid}
              to={"/group/$gid" as any}
              params={{ gid: `${gid}` } as any}
            >
              <Button
                className="w-full justify-start flex items-center space-x-2"
                variant="ghost"
              >
                <span>{name}</span>
              </Button>
            </Link>
          ))}
          <CreateGroup />
        </div>
      )}

      <div className="space-y-1 py-6">
        {renderEndItems()}
        {auth.mapSync(renderEndItems)}
        <Signout />
      </div>
    </nav>
  );
};

const LeftSidebar = () => {
  const { auth } = useAuth();
  // @ts-ignore FIXME
  const { data: user } = useQuery(["user.read", auth?.inner?.username], {
    enabled: auth?.isSome(),
  });
  const { isDarkMode, setIsDarkMode } = useGlobalContext();

  return (
    <aside className="w-[264px] p-6 bg-sidebar-background hidden flex-col sticky top-[60px] z-[49] lg:flex ">
      <nav
        aria-label="Sidebar Navigation"
        className="flex flex-col divide-y-[1px] divide-sidebar-border"
      >
        <div className="space-y-1 py-6">
          <NavItem title="Home" to="/" icon={HomeIcon} />
          <AuthWrapper>
            {renderStartItems()}
            {/* auth?.mapSync(renderStartItems) */}
          </AuthWrapper>
        </div>

        <AuthWrapper>
          <Accordion
            className="py-6"
            items={[
              {
                label: "MY COMMUNITIES",
                children: (
                  <div className="flex flex-col">
                    {membershipMocks.map(({ id, name, logo }) => (
                      <Link
                        key={id}
                        to="/communities/$id"
                        className="flex gap-2 items-center py-2 px-3"
                        params={{ id: `${id}` }}
                      >
                        <Avatar
                          className="!size-[32px] !rounded-lg"
                          src={logo}
                        />
                        <span className="font-semibold font-inter text-sm text-sidebar-foreground line-clamp-1">
                          {name}
                        </span>
                      </Link>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </AuthWrapper>
        {user !== undefined && (
          <div className="space-y-2 py-6">
            <div className="w-full justify-start flex items-center space-x-3 text-sm">
              <Users className="w-5 h-5" />
              <span>My Groups</span>
            </div>
            {user.memberships.map(([gid, name]) => (
              <Link
                key={gid}
                to={"/group/$gid" as any}
                params={{ gid: `${gid}` } as any}
              >
                <Button
                  className="w-full justify-start flex items-center space-x-2"
                  variant="ghost"
                >
                  <span>{name}</span>
                </Button>
              </Link>
            ))}
            <CreateGroup />
          </div>
        )}

        <div className="space-y-1 py-6">
          {renderEndItems()}
          {auth.mapSync(renderEndItems)}
          <Signout />
        </div>
      </nav>
    </aside>
  );
};

LeftSidebar.displayName = "LeftSidebar";
LeftSidebar.Content = SidebarContent;

export { LeftSidebar };
