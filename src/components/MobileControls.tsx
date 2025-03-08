import MobileButton from "./MobileButton";

export default function MobileControls() {
  const simulateKeyBoardPressDown = (
    event: React.TouchEvent<HTMLButtonElement>
  ) => {
    const fireEvent = new KeyboardEvent("keydown", {
      key: event.currentTarget.value,
    });
    window.dispatchEvent(fireEvent);
  };

  const simulateKeyBoardRelease = (
    event: React.TouchEvent<HTMLButtonElement>
  ) => {
    const fireEvent = new KeyboardEvent("keyup", {
      key: event.currentTarget.value,
    });
    window.dispatchEvent(fireEvent);
  };
  return (
    <div className="flex justify-between items-center px-3 2xl:hidden">
      <div className="flex flex-col w-28 gap-2">
        <MobileButton
          dispatchKeyBoardDown={simulateKeyBoardPressDown}
          dispatchKeyBoardUp={simulateKeyBoardRelease}
          value="a"
        />

        <MobileButton
          dispatchKeyBoardDown={simulateKeyBoardPressDown}
          dispatchKeyBoardUp={simulateKeyBoardRelease}
          value="d"
          custClass="ml-auto"
        />
      </div>
      <MobileButton
        dispatchKeyBoardDown={simulateKeyBoardPressDown}
        dispatchKeyBoardUp={simulateKeyBoardRelease}
        value=" "
        custClass="h-max"
      />
    </div>
  );
}
