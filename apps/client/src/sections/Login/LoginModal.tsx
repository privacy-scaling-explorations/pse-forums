import { Modal, ModalProps } from "@/components/ui/Modal";

export const LoginModal = ({ isOpen, setIsOpen }: ModalProps) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <div>Login</div>
    </Modal>
  );
};
