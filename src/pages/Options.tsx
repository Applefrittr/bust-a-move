import { ReactNode, useContext, useState } from "react";
import { OptionsContext } from "../components/Context";
import LinkBtn from "../components/LinkBtn";
import UIBtn from "../components/UIBtn";

type OptionFormElementProps = {
  children: ReactNode;
};

export default function Options() {
  const options = useContext(OptionsContext);
  const [saved, setSaved] = useState(false);

  const saveOptions = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataObj = Object.fromEntries(formData.entries());
    const optionsData = {
      sfx: dataObj.sfx ? true : false,
      music: dataObj.music ? true : false,
      mobileUI: dataObj.mobileUI ? true : false,
      left: dataObj.left.toString()[0] || "a",
      right: dataObj.right.toString()[0] || "d",
      fire:
        dataObj.fire.toString() === "space"
          ? " "
          : dataObj.fire.toString()[0] || " ",
    };
    options?.updateOptions(optionsData);
    setSaved(true);
  };

  return (
    <main className="p-8 flex items-center justify-center min-h-svh bg-[url(/src/assets/modal-bg.png)] bg-repeat">
      <form
        className="flex flex-col gap-4 p-8 border-white-solid border-2 lg:min-w-2xl bg-[#242424]"
        onSubmit={(e) => saveOptions(e)}
      >
        <h1 className="m-auto">Options</h1>
        <OptionFromElement>
          <label>Enable SFX</label>
          <input
            name="sfx"
            type="checkbox"
            defaultChecked={options?.sfx ? true : false}
          ></input>
        </OptionFromElement>
        <OptionFromElement>
          <label>Enable Music</label>
          <input
            name="music"
            type="checkbox"
            defaultChecked={options?.music ? true : false}
          ></input>
        </OptionFromElement>
        <OptionFromElement>
          <label>Mobile Controls</label>
          <input
            name="mobileUI"
            type="checkbox"
            defaultChecked={options?.mobileUI ? true : false}
          ></input>
        </OptionFromElement>
        <div className="flex-col flex gap-4">
          <h2 className="m-auto">Controls</h2>
          <OptionFromElement>
            <label htmlFor="left">Aim Left</label>
            <input
              name="left"
              maxLength={1}
              defaultValue={options?.left}
              className="focus:bg-white focus:text-black w-24 px-1 border-2 border-white"
              onClick={(e) => (e.currentTarget.value = "")}
              autoComplete="false"
            ></input>
          </OptionFromElement>
          <OptionFromElement>
            <label htmlFor="right">Aim Right</label>
            <input
              name="right"
              maxLength={1}
              defaultValue={options?.right}
              className=" focus:bg-white focus:text-black w-24 px-1 border-2 border-white"
              onClick={(e) => (e.currentTarget.value = "")}
              autoComplete="false"
            ></input>
          </OptionFromElement>
          <OptionFromElement>
            <label htmlFor="right">Fire Cannon</label>
            <input
              name="fire"
              maxLength={1}
              defaultValue={options?.fire === " " ? "space" : options?.fire}
              className="focus:bg-white focus:text-black w-24 px-1 border-2 border-white"
              onClick={(e) => (e.currentTarget.value = "")}
              autoComplete="false"
            ></input>
          </OptionFromElement>
        </div>
        <div className="flex gap-4">
          <UIBtn>SAVE</UIBtn>
          <LinkBtn to="/" text="BACK"></LinkBtn>
        </div>
        <p className="text-green-400">{saved ? "Options Saved!" : ""}</p>
      </form>
    </main>
  );
}

function OptionFromElement({ children }: OptionFormElementProps) {
  return <div className="flex justify-between flex-auto gap-4">{children}</div>;
}
