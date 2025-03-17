import Game from "../engine/Game";
import MobileControls from "./MobileControls";
import UIBtn from "./UIBtn";

type GameUIProps = {
  game: Game;
};

export default function GameUI({ game }: GameUIProps) {
  const generateStringScore = (num: number) => {
    const numOfDigits = num.toString().length;
    let scoreString = "" + num;
    for (let i = 0; i < 11 - numOfDigits; i++) {
      scoreString = "0" + scoreString;
    }
    return scoreString;
  };

  return (
    <section className="h-full relative z-10 flex flex-col justify-between p-2 2xl:p-8">
      <div className="flex justify-between items-center">
        <div className="font-bold space-y-4 2xl:text-2xl p-4 bg-black border-s-white border-2 rounded-2xl ">
          <p>{generateStringScore(game.score)}</p>
          <p>ROUND-{game.round}</p>
        </div>
        <div className="flex flex-col gap-2 h-max lg:flex-row">
          <UIBtn
            cb={(e) => {
              game?.togglePause();
              e?.currentTarget.blur();
            }}
          >
            PAUSE
          </UIBtn>
        </div>
      </div>
      <MobileControls />
    </section>
  );
}
