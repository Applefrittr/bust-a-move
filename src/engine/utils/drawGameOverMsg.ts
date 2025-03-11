import GameOver from "../../assets/text/game-over.png";
import preLoadSprite from "./preLoadSprite";
import { NATIVERESOLUTION } from "./constantValues";
import Game from "../Game";

const gameOver = await preLoadSprite(GameOver);

export default function drawGameOverMsg(game: Game) {
  game.ctx?.drawImage(
    gameOver,
    NATIVERESOLUTION.width / 2 - gameOver.width / 2,
    NATIVERESOLUTION.height / 2 - gameOver.height / 2
  );
}
