import GreenCritter from "../../assets/spriteSheets/orb-green-critter.png";
import BlueCritter from "../../assets/spriteSheets/orb-blue-critter.png";
import RedCritter from "../../assets/spriteSheets/orb-red-critter.png";
import PurpleCritter from "../../assets/spriteSheets/orb-purple-critter.png";
import YellowCritter from "../../assets/spriteSheets/orb-yellow-critter.png";
import WhiteCritter from "../../assets/spriteSheets/orb-white-critter.png";
import preLoadSprite from "../utils/preLoadSprite";

type CritterSprites = {
  [color: string]: {
    sprite: HTMLImageElement;
    width: number;
    height: number;
  };
};

const greenCritter = await preLoadSprite(GreenCritter);
const blueCritter = await preLoadSprite(BlueCritter);
const redCritter = await preLoadSprite(RedCritter);
const purpleCritter = await preLoadSprite(PurpleCritter);
const yellowCritter = await preLoadSprite(YellowCritter);
const whiteCritter = await preLoadSprite(WhiteCritter);

export const critterSprites: CritterSprites = {
  green: {
    sprite: greenCritter,
    width: greenCritter.width / 4,
    height: greenCritter.height,
  },
  blue: {
    sprite: blueCritter,
    width: blueCritter.width / 4,
    height: blueCritter.height,
  },
  red: {
    sprite: redCritter,
    width: redCritter.width / 4,
    height: redCritter.height,
  },
  purple: {
    sprite: purpleCritter,
    width: purpleCritter.width / 4,
    height: purpleCritter.height,
  },
  yellow: {
    sprite: yellowCritter,
    width: yellowCritter.width / 4,
    height: yellowCritter.height,
  },
  white: {
    sprite: whiteCritter,
    width: redCritter.width / 4,
    height: redCritter.height,
  },
};
