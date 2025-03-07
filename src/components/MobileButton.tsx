type MobileButtonProps = {
  children: React.ReactNode;
  dispatchKeyBoardDown: (event: React.TouchEvent<HTMLButtonElement>) => void;
  dispatchKeyBoardUp: (event: React.TouchEvent<HTMLButtonElement>) => void;
  value: string;
  custClass?: string;
};

export default function MobileButton({
  children,
  dispatchKeyBoardDown,
  dispatchKeyBoardUp,
  value,
  custClass,
}: MobileButtonProps) {
  return (
    <button
      value={value}
      onTouchStart={(event) => dispatchKeyBoardDown(event)}
      onTouchEnd={(event) => dispatchKeyBoardUp(event)}
      className={`px-4 py-2 text-center w-max bg-black border-s-white border-2 
        rounded-2xl hover:cursor-pointer active:scale-95 focus:bg-blue-500 opacity-75
         ${custClass ? custClass : ""}`}
    >
      {children}
    </button>
  );
}
