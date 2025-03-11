import Game from "../Game";
import { NATIVERESOLUTION } from "./constantValues";
import RoundClear from "../../assets/text/round-clear.png";
import Digits from "../../assets/text/msg-numbers.png";
import Pts from "../../assets/text/pts.png";
import preLoadSprite from "./preLoadSprite";

const roundClear = await preLoadSprite(RoundClear);
const pts = await preLoadSprite(Pts);
const digits = await preLoadSprite(Digits);
const digitWidth = digits.width / 10;

export default function drawRoundCompleteMsg(game: Game) {
  const scoreDigits = game.roundScore
    .toString()
    .split("")
    .map((digit) => Number(digit));

  game.ctx?.drawImage(
    roundClear,
    NATIVERESOLUTION.width / 2 - roundClear.width / 2,
    NATIVERESOLUTION.height / 2 - roundClear.height
  );

  for (let i = 0, len = scoreDigits.length; i < len; i++) {
    game.ctx?.drawImage(
      digits,
      scoreDigits[i] * digitWidth,
      0,
      digitWidth,
      digits.height,
      NATIVERESOLUTION.width / 2 - digitWidth * (len - i) - digitWidth,
      NATIVERESOLUTION.height / 2 + digits.height,
      digitWidth,
      digits.height
    );
  }

  game.ctx?.drawImage(
    pts,
    NATIVERESOLUTION.width / 2 + digitWidth,
    NATIVERESOLUTION.height / 2 + pts.height
  );
}
