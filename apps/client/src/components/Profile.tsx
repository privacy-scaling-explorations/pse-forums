import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/Avatar";
import { useState } from "react";
import { LoginModal } from "./sections/Login/LoginModal";

export function Profile() {
  const { auth, setAuth } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return auth.mapOrSync(
    <>
      <div className="flex items-center gap-3">
        <Button
          onClick={() => {
            setIsLoginModalOpen(true);
            //setAuth(undefined);
          }}
        >
          Login
        </Button>
      </div>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
    </>,
    ({ username }) => <div>{username}</div>,
  );
}
