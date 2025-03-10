import GreenBust from "../../assets/spriteSheets/orb-green-bust.png";
import BlueBust from "../../assets/spriteSheets/orb-blue-bust.png";
import RedBust from "../../assets/spriteSheets/orb-red-bust.png";
import PurpleBust from "../../assets/spriteSheets/orb-purple-bust.png";
import YellowBust from "../../assets/spriteSheets/orb-yellow-bust.png";
import WhiteBust from "../../assets/spriteSheets/orb-white-bust.png";
import preLoadSprite from "../utils/preLoadSprite";

type ExplosionSprites = {
  [color: string]: {
    explosion: HTMLImageElement;
    width: number;
    height: number;
  };
};

const greenBust = await preLoadSprite(GreenBust);
const blueBust = await preLoadSprite(BlueBust);
const redBust = await preLoadSprite(RedBust);
const purpleBust = await preLoadSprite(PurpleBust);
const yellowBust = await preLoadSprite(YellowBust);
const whiteBust = await preLoadSprite(WhiteBust);

export const explosionSprites: ExplosionSprites = {
  green: {
    explosion: greenBust,
    width: greenBust.width / 7,
    height: greenBust.height,
  },
  blue: {
    explosion: blueBust,
    width: blueBust.width / 7,
    height: blueBust.height,
  },
  red: {
    explosion: redBust,
    width: redBust.width / 7,
    height: redBust.height,
  },
  purple: {
    explosion: purpleBust,
    width: purpleBust.width / 7,
    height: purpleBust.height,
  },
  yellow: {
    explosion: yellowBust,
    width: yellowBust.width / 7,
    height: yellowBust.height,
  },
  white: {
    explosion: whiteBust,
    width: whiteBust.width / 7,
    height: whiteBust.height,
  },
};
