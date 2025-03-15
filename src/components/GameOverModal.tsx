import Game from "../engine/Game";
import LinkBtn from "./LinkBtn";
import UIBtn from "./UIBtn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getScores, submitScore, FBUserDoc } from "../services/queries";

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
  cancelAnimationFrame(frame);

  const { data } = useQuery({
    queryKey: ["scores"],
    queryFn: getScores,
  });

  const { mutate, isSuccess, isPending, isError } = useMutation({
    mutationFn: submitScore,
  });

  const submitNewScore = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const userData: FBUserDoc = { name: "", score: 0 };

    userData.name = formData.get("name") as string;
    userData.score = game.score;

    mutate(userData);
  };

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
      {data &&
        (game.score > data[data.length - 1].score || data.length < 10) && (
          <form
            className="bg-black text-white p-4 border-2 border-white rounded-2xl m-4"
            onSubmit={submitNewScore}
          >
            <h2 className="w-max m-auto">NEW HIGH SCORE</h2>
            <input
              type="text"
              placeholder="name"
              className="bg-white text-black m-2 text-center"
              size={15}
              name="name"
            />
            <div className="m-auto w-max">
              <UIBtn>SUBMIT</UIBtn>
            </div>
            {isSuccess && <p>SUCCESS!</p>}
            {isPending && <p>SUBMITTING...</p>}
            {isError && <p>Somethign went wrong</p>}
          </form>
        )}
    </section>
  );
}
