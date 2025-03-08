type MobileButtonProps = {
  dispatchKeyBoardDown: (event: React.TouchEvent<HTMLButtonElement>) => void;
  dispatchKeyBoardUp: (event: React.TouchEvent<HTMLButtonElement>) => void;
  value: string;
  custClass?: string;
};

export default function MobileButton({
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
      className={`p-8 rounded-full text-center w-max bg-black border-s-white border-2 
        hover:cursor-pointer active:scale-95 focus:bg-blue-500 opacity-60
         ${custClass ? custClass : ""}`}
    ></button>
  );
}
