import { createContext } from "react";

export type OptionsObj = {
  sfx: boolean;
  music: boolean;
  mobileUI: boolean;
  left: string;
  right: string;
  fire: string;
};

export const OptionsContext = createContext<OptionsObj>({
  sfx: true,
  music: true,
  mobileUI: true,
  left: "a",
  right: "d",
  fire: " ",
});
