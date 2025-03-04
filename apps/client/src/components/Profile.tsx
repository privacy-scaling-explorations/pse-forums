import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { LoginModal } from "@/components/sections/Login/LoginModal";

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
