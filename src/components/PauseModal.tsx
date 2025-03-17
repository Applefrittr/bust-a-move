import { useContext, useState } from "react";
import Game from "../engine/Game";
import LinkBtn from "./LinkBtn";
import UIBtn from "./UIBtn";
import { OptionsContext } from "./Context";

type PauseModalProps = {
  game: Game;
};

export default function PauseModal({ game }: PauseModalProps) {
  const options = useContext(OptionsContext);
  const [saved, setSaved] = useState(false);

  const saveOptions = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (options) {
      const formData = new FormData(e.currentTarget);
      const dataObj = Object.fromEntries(formData.entries());
      const optionsData = {
        sfx: dataObj.sfx ? true : false,
        music: dataObj.music ? true : false,
        mobileUI: dataObj.mobileUI ? true : false,
      };
      options.updateOptions(optionsData);
      game.setOptions(options);
      setSaved(true);
    }
  };

  return (
    <section className="absolute left-0 top-0 h-full w-full bg-black/50 z-10 flex justify-center items-center p-1">
      <div className="border-1 border-white p-2 sm:p-4 bg-[#242424] flex flex-col gap-4">
        <h2>Pause Menu</h2>
        <form
          className="flex flex-col gap-4 p-2"
          onSubmit={(e) => saveOptions(e)}
        >
          <div className="flex justify-between">
            <label>Enable SFX</label>
            <input
              name="sfx"
              type="checkbox"
              defaultChecked={options?.sfx ? true : false}
            ></input>
          </div>
          <div className="flex justify-between">
            <label>Enable Music</label>
            <input
              name="music"
              type="checkbox"
              defaultChecked={options?.music ? true : false}
            ></input>
          </div>
          <div className="flex justify-between">
            <label>Mobile Controls</label>
            <input
              name="mobileUI"
              type="checkbox"
              defaultChecked={options?.mobileUI ? true : false}
            ></input>
          </div>
          <UIBtn>SAVE</UIBtn>
          <p className="text-green-400">{saved ? "Options Saved!" : ""}</p>
        </form>
        <div className="flex gap-4 flex-wrap">
          <UIBtn
            cb={(e) => {
              game?.togglePause();
              e?.currentTarget.blur();
            }}
          >
            RESUME
          </UIBtn>
          <LinkBtn to="/" text="MAIN MENU"></LinkBtn>
        </div>
      </div>
    </section>
  );
}
