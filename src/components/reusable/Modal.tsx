import { X } from "@phosphor-icons/react";
type ModalProps = {
  children?: React.ReactNode;
  showCloseButton?: boolean;
  title?: string;
  handleClose?: () => void;
};

export const Modal = ({
  children,
  showCloseButton = true,
  handleClose,
  title = "Modal title",
}: ModalProps) => {
  return (
    <div
      className="fixed bg-opacity-30 inset-0 h-screen bg-black flex items-center justify-center"
      style={{ zIndex: 101 }}
    >
      <section className="max-w-screen-sm w-[32rem] rounded-lg bg-elevated">
        <header className="w-full flex justify-between items-center p-6">
          <h1 className="text-white text-2xl font-bold">{title}</h1>
          {showCloseButton && (
            <button className="" onClick={handleClose}>
              <X size={24} fill="#a7a7a7" />
            </button>
          )}
        </header>
        <main className="px-6 pt-0 py-6">{children}</main>
      </section>
    </div>
  );
};
