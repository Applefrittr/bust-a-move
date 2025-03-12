import { ReactNode } from "react";

type UIbtnProps = {
  children: ReactNode;
  cb?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function UIBtn({ children, cb }: UIbtnProps) {
  return (
    <button
      className="px-4 py-2 text-center bg-black border-s-white border-2 rounded-2xl hover:cursor-pointer active:scale-95 focus:bg-blue-500"
      onClick={cb}
    >
      {children}
    </button>
  );
}
