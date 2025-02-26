import { Header } from "c/Header";
import { LeftSidebar } from "c/LeftSidebar";
import { RightSidebar } from "c/RightSidebar";

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
    <div className="min-h-screen">
      {showHeader && <Header />}
      <main className="bg-white">
        <div className="flex justify-between">
          {showLeftSidebar && <LeftSidebar />}
          {children && <div className="flex-1 p-6">{children}</div>}
          {showRightSidebar && (
            <div className="mr-6 pt-6">
              <RightSidebar />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
