import { createContext } from "react";

export type UpdateOptionsParamObj = {
  sfx?: boolean;
  music?: boolean;
  mobileUI?: boolean;
  left?: string;
  right?: string;
  fire?: string;
};

export type OptionsObj = {
  sfx: boolean;
  music: boolean;
  mobileUI: boolean;
  left: string;
  right: string;
  fire: string;
  updateOptions: (updateObj: UpdateOptionsParamObj) => void;
};

export const OptionsContext = createContext<OptionsObj | null>(null);
