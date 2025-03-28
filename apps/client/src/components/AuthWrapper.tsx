import { ReactNode, forwardRef } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";
import { cn } from "@/lib/utils";
interface AuthWrapperProps {
  children?: ReactNode;
  fallback?: ReactNode;
  requireLogin?: boolean;
  action?: () => Promise<void> | void;
  className?: string;
}

export const AuthWrapper = forwardRef<HTMLDivElement, AuthWrapperProps>(
  ({ children, fallback, requireLogin = false, className }, ref) => {
    const { isLoggedIn, setShowLoginModal } = useGlobalContext();

    if (!isLoggedIn && !requireLogin) {
      return fallback ?? null;
    }

    return (
      <div
        ref={ref}
        className={cn(className)}
        onClick={(e) => {
          e.preventDefault();
          if (!isLoggedIn) {
            setShowLoginModal(true);
          }
        }}
      >
        {children}
      </div>
    );
  },
);

AuthWrapper.displayName = "AuthWrapper";
