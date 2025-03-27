import { ReactNode } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";

interface AuthWrapperProps {
  children?: ReactNode;
  fallback?: ReactNode;
  showLoginModal?: boolean;
}

export const AuthWrapper = ({
  children,
  fallback,
  showLoginModal = false,
}: AuthWrapperProps) => {
  const { isLoggedIn, setShowLoginModal } = useGlobalContext();

  if (!isLoggedIn && !showLoginModal) {
    return fallback ?? null;
  }

  return <div onClick={() => setShowLoginModal(true)}>{children}</div>;
};
