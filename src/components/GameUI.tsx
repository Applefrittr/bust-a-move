import Game from "../engine/Game";
import LinkBtns from "./LinkBtns";
import MobileControls from "./MobileControls";

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
        <div className="font-bold space-y-4 2xl:text-3xl p-4 bg-black border-s-white border-2 rounded-2xl ">
          <p>{generateStringScore(game.score)}</p>
          <p>LEVEL-{game.level}</p>
        </div>
        <div className="flex flex-col gap-2 h-max lg:flex-row">
          <button
            onClick={(e) => {
              game?.togglePause();
              e.currentTarget.blur();
            }}
            className="px-4 py-2 bg-black border-s-white border-2 rounded-2xl hover:cursor-pointer active:scale-95 focus:bg-blue-500"
          >
            PAUSE
          </button>
          <LinkBtns to="/" text="HOME" />
        </div>
      </div>
      <MobileControls />
    </section>
  );
}
