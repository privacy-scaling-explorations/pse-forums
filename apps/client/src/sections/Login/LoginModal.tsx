import { Button } from "@/components/ui/Button";
import { Modal, ModalProps } from "@/components/ui/Modal";
import { useMockAuth } from "@/hooks/useAuth";
import { Link } from "@tanstack/react-router";

export const LoginModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const loginMutation = useMockAuth({
    onSuccess: () => {
      setIsOpen(false);
    },
  });
  return (
    <Modal title="Login" isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-1">
          <span className="text-base-muted-foreground leading-5 text-sm font-bold">
            Private Google Sign In
          </span>
          <span className="text-base-muted-foreground text-sm leading-5">
            We'll use Stealth.notes protocol as a way to log in and prove your
            email domain ownership in private way without our server knowing who
            you are.
            <Link className="text-link block" to="#">
              Read more here
            </Link>
          </span>
        </div>
        <Button
          onClick={() => loginMutation.mutateAsync()}
          loading={loginMutation.isPending}
        >
          Sign in with Google
        </Button>
      </div>
    </Modal>
  );
};
