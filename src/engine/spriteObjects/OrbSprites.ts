import preLoadSprite from "../utils/preLoadSprite";
import GreenIdle from "../../assets/spriteSheets/orb-green-idle.png";
import GreenShine from "../../assets/spriteSheets/orb-green-shine.png";
import BlueIdle from "../../assets/spriteSheets/orb-blue-idle.png";
import BlueShine from "../../assets/spriteSheets/orb-blue-shine.png";
import RedIdle from "../../assets/spriteSheets/orb-red-idle.png";
import RedShine from "../../assets/spriteSheets/orb-red-shine.png";
import PurpleIdle from "../../assets/spriteSheets/orb-purple-idle.png";
import PurpleShine from "../../assets/spriteSheets/orb-purple-shine.png";
import YellowIdle from "../../assets/spriteSheets/orb-yellow-idle.png";
import YellowShine from "../../assets/spriteSheets/orb-yellow-shine.png";
import WhiteIdle from "../../assets/spriteSheets/orb-white-idle.png";
import WhiteShine from "../../assets/spriteSheets/orb-white-shine.png";

type OrbSpriteObject = {
  idle: HTMLImageElement;
  shine: HTMLImageElement;
  width: number;
  height: number;
};

type OrbSprites = {
  [color: string]: OrbSpriteObject;
};

const greenIdle = await preLoadSprite(GreenIdle);
const greenShine = await preLoadSprite(GreenShine);
const blueIdle = await preLoadSprite(BlueIdle);
const blueShine = await preLoadSprite(BlueShine);
const redIdle = await preLoadSprite(RedIdle);
const redShine = await preLoadSprite(RedShine);
const purpleIdle = await preLoadSprite(PurpleIdle);
const purpleShine = await preLoadSprite(PurpleShine);
const yellowIdle = await preLoadSprite(YellowIdle);
const yellowShine = await preLoadSprite(YellowShine);
const whiteIdle = await preLoadSprite(WhiteIdle);
const whiteShine = await preLoadSprite(WhiteShine);

export const orbSprites: OrbSprites = {
  green: {
    idle: greenIdle,
    shine: greenShine,
    width: greenIdle.width / 3 - 1,
    height: greenIdle.height,
  },
  blue: {
    idle: blueIdle,
    shine: blueShine,
    width: blueIdle.width / 3 - 1,
    height: blueIdle.height,
  },
  red: {
    idle: redIdle,
    shine: redShine,
    width: redIdle.width / 3 - 1,
    height: redIdle.height,
  },
  purple: {
    idle: purpleIdle,
    shine: purpleShine,
    width: purpleIdle.width / 3 - 1,
    height: purpleIdle.height,
  },
  yellow: {
    idle: yellowIdle,
    shine: yellowShine,
    width: yellowIdle.width / 3 - 1,
    height: yellowIdle.height,
  },
  white: {
    idle: whiteIdle,
    shine: whiteShine,
    width: whiteIdle.width / 3 - 1,
    height: whiteIdle.height,
  },
};

export const colors = Array.from(Object.keys(orbSprites));
