import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { LoginModal } from "@/sections/Login/LoginModal";
import { AuthWrapper } from "./AuthWrapper";
import { Avatar } from "./Avatar";
import { useGlobalContext } from "@/contexts/GlobalContext";

export function Profile() {
  //const { auth, setAuth } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user } = useGlobalContext();
  return (
    <>
      <LoginModal isOpen={isLoginModalOpen} setIsOpen={setIsLoginModalOpen} />
      <AuthWrapper
        fallback={
          <div className="flex items-center gap-3">
            <Button onClick={() => setIsLoginModalOpen(true)}>Login</Button>
          </div>
        }
      >
        <Avatar src={user?.avatar} />
      </AuthWrapper>
    </>
  );

  /*
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
  );*/
}
