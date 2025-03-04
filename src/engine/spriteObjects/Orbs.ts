import preLoadSprite from "../utils/preLoadSprite";
import GreenIdle from "../../assets/orb-green-idle.png";
import GreenShine from "../../assets/orb-green-shine.png";
import GreenBust from "../../assets/orb-green-bust.png";
import BlueIdle from "../../assets/orb-blue-idle.png";
import BlueShine from "../../assets/orb-blue-shine.png";
import BlueBust from "../../assets/orb-blue-bust.png";
import RedIdle from "../../assets/orb-red-idle.png";
import RedShine from "../../assets/orb-red-shine.png";
import RedBust from "../../assets/orb-red-bust.png";

type OrbSpriteObject = {
  idle: HTMLImageElement;
  shine: HTMLImageElement;
  bust: HTMLImageElement;
  bustWidth: number;
  bustHeight: number;
  width: number;
  height: number;
};

type OrbSprites = {
  [color: string]: OrbSpriteObject;
};

const greenIdle = await preLoadSprite(GreenIdle);
const greenShine = await preLoadSprite(GreenShine);
const greenBust = await preLoadSprite(GreenBust);
const blueIdle = await preLoadSprite(BlueIdle);
const blueShine = await preLoadSprite(BlueShine);
const blueBust = await preLoadSprite(BlueBust);
const redIdle = await preLoadSprite(RedIdle);
const redShine = await preLoadSprite(RedShine);
const redBust = await preLoadSprite(RedBust);

export const orbSprites: OrbSprites = {
  green: {
    idle: greenIdle,
    shine: greenShine,
    bust: greenBust,
    bustWidth: greenBust.width / 7 - 1,
    bustHeight: greenBust.height,
    width: greenIdle.width / 3 - 1,
    height: greenIdle.height,
  },
  blue: {
    idle: blueIdle,
    shine: blueShine,
    bust: blueBust,
    bustWidth: blueBust.width / 7 - 1,
    bustHeight: blueBust.height,
    width: blueIdle.width / 3 - 1,
    height: blueIdle.height,
  },
  red: {
    idle: redIdle,
    shine: redShine,
    bust: redBust,
    bustWidth: redBust.width / 7 - 1,
    bustHeight: redBust.height,
    width: redIdle.width / 3 - 1,
    height: redIdle.height,
  },
};

export const colors = Array.from(Object.keys(orbSprites));
