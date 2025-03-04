import GreenCritter from "../../assets/orb-green-critter.png";
import BlueCritter from "../../assets/orb-blue-critter.png";
import RedCritter from "../../assets/orb-red-critter.png";
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
};
