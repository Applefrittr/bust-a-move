import Game from "../Game";
import bg1 from "../../assets/arena/bg-lvl1.png";
import bg2 from "../../assets/arena/bg-lvl2.png";
import bg3 from "../../assets/arena/bg-lvl3.png";
import bg4 from "../../assets/arena/bg-lvl4.png";
import bg5 from "../../assets/arena/bg-lvl5.png";
import preLoadSprite from "./preLoadSprite";

const BG1 = await preLoadSprite(bg1);
const BG2 = await preLoadSprite(bg2);
const BG3 = await preLoadSprite(bg3);
const BG4 = await preLoadSprite(bg4);
const BG5 = await preLoadSprite(bg5);

const levels = [BG1, BG2, BG3, BG4, BG5];

export default function drawBackGround(game: Game) {
  if (game.ctx) {
    const level = (game.level - 1) % levels.length;
    const pattern = game.ctx.createPattern(
      levels[level],
      "repeat"
    ) as CanvasPattern;
    game.ctx.fillStyle = pattern;
    game.ctx.fillRect(
      0 - game.transformOrigin.x,
      0 - game.transformOrigin.y,
      game.width,
      game.height
    );
  }
}
