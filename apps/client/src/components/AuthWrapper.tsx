import { ReactNode } from "react";
import { useGlobalContext } from "@/contexts/GlobalContext";

interface AuthWrapperProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

export const AuthWrapper = ({ children, fallback }: AuthWrapperProps) => {
  const { isLoggedIn } = useGlobalContext();

  if (!isLoggedIn) {
    return fallback ?? null;
  }

  return <>{children}</>;
};
