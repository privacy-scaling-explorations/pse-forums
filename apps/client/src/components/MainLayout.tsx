import { Header } from "@/components/Header";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { VersionDetail } from "./VersionDetail";
interface MainLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  showLeftSidebar?: boolean;
  showRightSidebar?: boolean;
}

export const MainLayout = ({
  children,
  showHeader = false,
  showLeftSidebar = false,
  showRightSidebar = false,
}: MainLayoutProps) => {
  const { isMenuOpen, setIsMenuOpen, isDarkMode } = useGlobalContext();

  const router = useRouter();

  const pathname = router?.latestLocation?.href;  

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const hasBothSidebars = showLeftSidebar && showRightSidebar;

  return (
    <div className={cn("h-screen", isDarkMode ? "dark" : "")}>
      {showHeader && <Header />}
      <main className="bg-base-background h-[calc(100vh-65px)] flex justify-between overflow-hidden">
        {showLeftSidebar && <LeftSidebar />}
        {children && (
          <div
            className={cn(
              "flex-1",
              isMenuOpen ? "overflow-y-hidden" : "overflow-y-scroll",
            )}
          >
            {children}
            {!hasBothSidebars && <VersionDetail />}
          </div>
        )}
        {showRightSidebar && (
          <div className="mr-6 pt-6 hidden lg:block">
            <RightSidebar />
            {!hasBothSidebars && <VersionDetail />}
          </div>
        )}
      </main>
    </div>
  );
};
