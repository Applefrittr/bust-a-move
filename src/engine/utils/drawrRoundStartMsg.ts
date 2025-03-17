import Game from "../Game";
import Digits from "../../assets/text/msg-numbers.png";
import Round from "../../assets/text/round.png";
import preLoadSprite from "./preLoadSprite";
import { NATIVERESOLUTION } from "./constantValues";

const roundSprite = await preLoadSprite(Round);
const digits = await preLoadSprite(Digits);
const digitWidth = digits.width / 10;

export default function drawRoundStartMsg(game: Game) {
  const round = game.round
    .toString()
    .split("")
    .map((digit) => Number(digit));

  const len = round.length;

  game.ctx?.drawImage(
    roundSprite,
    NATIVERESOLUTION.width / 2 - (roundSprite.width + digitWidth * len) / 2,
    NATIVERESOLUTION.height / 2 - roundSprite.height / 2
  );

  for (let i = 0; i < len; i++) {
    game.ctx?.drawImage(
      digits,
      round[i] * digitWidth,
      0,
      digitWidth,
      digits.height,
      NATIVERESOLUTION.width / 2 + digitWidth * i + roundSprite.width / 2,
      NATIVERESOLUTION.height / 2 - digits.height / 2,
      digitWidth,
      digits.height
    );
  }
}
