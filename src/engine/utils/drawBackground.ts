import Game from "../Game";
import background from "../../assets/bg-lvl1.png";
import preLoadSprite from "./preLoadSprite";

const BG = await preLoadSprite(background);

export default function drawBackGround(game: Game) {
  if (game.ctx) {
    const pattern = game.ctx.createPattern(BG, "repeat") as CanvasPattern;
    game.ctx.fillStyle = pattern;
    game.ctx.fillRect(
      0 - game.transformOrigin.x,
      0 - game.transformOrigin.y,
      game.width,
      game.height
    );
  }
}
