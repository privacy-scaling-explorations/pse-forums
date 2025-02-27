import { Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth"; 
import { Button } from "@/components/ui/Button";
import { Avatar } from "@/components/Avatar";
export function Profile() {
  const { auth, setAuth } = useAuth();

  return auth.mapOrSync(
    <div className="flex items-center gap-3">
      <Link to="/profile">
        <Avatar className="bg-gray-200" />
      </Link>
      <Button
        variant="outline"
        onClick={() => {
          setAuth(undefined);
        }}
      >
        Sign In
      </Button>
      <Link to="/login">
        <Button>Sign Up</Button>
      </Link>
    </div>,
    ({ username }) => <div>{username}</div>,
  );
}
