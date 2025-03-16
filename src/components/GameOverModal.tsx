import Game from "../engine/Game";
import LinkBtn from "./LinkBtn";
import UIBtn from "./UIBtn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["scores"],
    queryFn: getScores,
  });

  const { mutate, isSuccess, isPending, isError, isIdle } = useMutation({
    mutationFn: submitScore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scores"] });
    },
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
    <section className="absolute left-0 top-0 h-full w-full z-10 flex flex-col justify-center items-center gap-8">
      {data &&
        (game.score > data[data.length - 1].score || data.length < 10) && (
          <form
            className="bg-black text-white p-4 border-2 border-white rounded-2xl w-max absolute top-1/4 -translate-y-1/4 flex flex-col justify-center items-center gap-2"
            onSubmit={submitNewScore}
          >
            <div className="flex gap-2 items-center">
              <div className="w-6 h-6 bg-[url(/src/assets/stars.png)] bg-cover animate-star"></div>
              <h2 className="w-max">NEW HIGH SCORE</h2>
              <div className="w-6 h-6 bg-[url(/src/assets/stars.png)] bg-cover animate-star"></div>
            </div>
            <input
              type="text"
              placeholder="name"
              className="bg-white text-black text-center"
              size={15}
              minLength={3}
              maxLength={15}
              name="name"
            />
            <p className="text-[.5rem]">3-15 characters long</p>
            {isIdle && (
              <div className={`m-auto w-max`}>
                <UIBtn>SUBMIT</UIBtn>
              </div>
            )}
            {isSuccess && (
              <p className="text-green-300">SCORE ADDED SUCCESSFULLY</p>
            )}
            {isPending && <p>SUBMITTING...</p>}
            {isError && <p className="text-red-300">Something went wrong</p>}
          </form>
        )}
      <div className="flex gap-8 justify-center m-4 translate-y-full">
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
    </section>
  );
}
