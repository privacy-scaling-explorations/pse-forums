import { Header } from "@/components/Header";
import { LeftSidebar } from "@/components/LeftSidebar";
import { RightSidebar } from "@/components/RightSidebar";

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
  return (
    <div className="h-screen">
      {showHeader && <Header />}
      <main className="bg-white h-[calc(100vh-60px)] flex justify-between">
        {showLeftSidebar && <LeftSidebar />}
        {children && <div className="flex-1 p-6 overflow-y-auto">{children}</div>}
        {showRightSidebar && (
          <div className="mr-6 pt-6 hidden lg:block">
            <RightSidebar />
          </div>
        )}
      </main>
    </div>
  );
};
