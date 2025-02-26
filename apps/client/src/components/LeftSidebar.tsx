import { Link } from "@tanstack/react-router";
import { CreateGroup } from "c/CreateGroup";
import { Signout } from "c/Signout";
import { useAuth } from "h/useAuth";
import { useQuery } from "l/rspc";
import { Home as HomeIcon, Icon, LucideIcon, Users } from "lucide-react";
import { Button } from "c/ui/button";
import { MAIN_NAV_ITEMS } from "settings";
import { cn } from "l/utils";

const renderNavItems = (
  _items: (typeof MAIN_NAV_ITEMS)[keyof typeof MAIN_NAV_ITEMS],
) =>
  _items.map((item) => (
    <NavItem
      to={item.to}
      key={item.title}
      title={item.title}
      icon={item.icon}
    />
  ));

const renderStartItems = () => renderNavItems(MAIN_NAV_ITEMS.start);
const renderEndItems = () => renderNavItems(MAIN_NAV_ITEMS.end);

const NavItem = ({
  title,
  to,
  icon,
}: {
  title: string;
  to: string;
  icon: LucideIcon;
}) => {
  const Icon = icon;

  return (
    <Link
      to={to}
      key={title}
      className={cn(
        "text-sm font-inter font-medium leading-5 text-[#71717A] cursor-pointer",
        "duration-200 hover:bg-white-light hover:text-black",
        "inline-flex items-center gap-2 whitespace-nowrap rounded-md h-9 py-2 w-full justify-start",
      )}
    >
      <Button
        variant="ghost"
      >
        <Icon className="text-black text-base" size={16} />
        <span>{title}</span>
      </Button>
    </Link>
  );
};

export function LeftSidebar() {
  const { auth } = useAuth();
  // @ts-ignore FIXME
  const { data: user } = useQuery(["user.read", auth?.inner?.username], {
    enabled: auth?.isSome(),
  });


  return (
    <aside className="w-[264px] p-6 bg-white-dark flex flex-col sticky top-[60px] z-[49]">
      <nav aria-label="Sidebar Navigation" className="flex flex-col">
        <div className="space-y-2">
          <NavItem title="Home" to="/" icon={HomeIcon} />
          {renderStartItems()}
          {auth?.mapSync(renderStartItems)}
        </div>

        {user !== undefined && (
          <div className="space-y-2 mt-6">
            <div className="w-full justify-start flex items-center space-x-3 text-sm">
              <Users className="w-5 h-5" />
              <span>My Groups</span>
            </div>
            {user.memberships.map(([gid, name]) => (
              <Link key={gid} to="/group/$gid" params={{ gid: `${gid}` }}>
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

        <div className="flex-grow" />

        <div className="space-y-2">
          {renderEndItems()}
          {auth.mapSync(renderEndItems)}
          <Signout />
        </div>
      </nav>
    </aside>
  );
}
