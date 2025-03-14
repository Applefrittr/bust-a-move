import Game from "../engine/Game";
import LinkBtn from "./LinkBtn";
import UIBtn from "./UIBtn";
import { useQuery } from "@tanstack/react-query";
import { getScores, submitScore } from "../services/queries";

type GameOverModalProps = {
  game: Game;
  frame: number;
  syncReactFrames: () => void;
};

export default function GameOverModal({
  game,
  frame,
  syncReactFrames,
}: GameOverModalProps) {
  const { data } = useQuery({
    queryKey: ["scores"],
    queryFn: getScores,
  });
  cancelAnimationFrame(frame);

  // if (data) {
  //   const lowestScore = data[data.length - 1].score;

  //   console.log("score: ", game.score, data);
  //   console.log(game.score > lowestScore);
  // }

  return (
    <section className="absolute left-1/2 top-1/2 -translate-x-1/2 z-10">
      <div className="flex gap-8 justify-center m-4">
        <UIBtn
          cb={() => {
            game.restart();
            syncReactFrames();
          }}
        >
          RESTART
        </UIBtn>
        <LinkBtn to="/" text="HOME"></LinkBtn>
      </div>
      {data && game.score > data[data.length - 1].score && (
        <div className="bg-black text-white p-4 border-2 border-white rounded-2xl m-4">
          <h2 className="w-max m-auto">NEW HIGH SCORE</h2>
          <input
            type="text"
            placeholder="name"
            className="bg-white text-black m-2 text-center"
            size={15}
          />
          <div className="m-auto w-max">
            <UIBtn>SUBMIT</UIBtn>
          </div>
        </div>
      )}
    </section>
  );
}
