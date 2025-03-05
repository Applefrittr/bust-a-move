import GreenNums from "../../assets/numbers-sheet-green.png";
import BlueNums from "../../assets/numbers-sheet-blue.png";
import RedNums from "../../assets/numbers-sheet-red.png";
import YellowNums from "../../assets/numbers-sheet-yellow.png";
import preLoadSprite from "../utils/preLoadSprite";

const green = await preLoadSprite(GreenNums);
const blue = await preLoadSprite(BlueNums);
const red = await preLoadSprite(RedNums);
const yellow = await preLoadSprite(YellowNums);

export const numbers = {
  green,
  blue,
  red,
  yellow,
  digitWidth: green.width / 10,
  digitHieght: green.height,
};
