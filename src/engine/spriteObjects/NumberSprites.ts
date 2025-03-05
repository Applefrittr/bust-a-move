import Numbers from "../../assets/numbers-sheet.png";
import preLoadSprite from "../utils/preLoadSprite";

const sprite = await preLoadSprite(Numbers);

export const numbers = {
  sprite,
  digitWidth: sprite.width / 10,
  digitHieght: sprite.height,
};
