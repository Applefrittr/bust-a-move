import Game from "../Game";
import Digits from "../../assets/text/msg-numbers.png";
import Round from "../../assets/text/round.png";
import preLoadSprite from "./preLoadSprite";
import { NATIVERESOLUTION } from "./constantValues";

const round = await preLoadSprite(Round);
const digits = await preLoadSprite(Digits);
const digitWidth = digits.width / 10;

export default function drawRoundStartMsg(game: Game) {
  const level = game.level
    .toString()
    .split("")
    .map((digit) => Number(digit));

  const len = level.length;

  game.ctx?.drawImage(
    round,
    NATIVERESOLUTION.width / 2 - (round.width + digitWidth * len) / 2,
    NATIVERESOLUTION.height / 2 - round.height / 2
  );

  for (let i = 0; i < len; i++) {
    game.ctx?.drawImage(
      digits,
      level[i] * digitWidth,
      0,
      digitWidth,
      digits.height,
      NATIVERESOLUTION.width / 2 + digitWidth * i + round.width / 2,
      NATIVERESOLUTION.height / 2 - digits.height / 2,
      digitWidth,
      digits.height
    );
  }
}
