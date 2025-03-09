import orbBag from "../../assets/spriteSheets/orbBag.png";
import Game from "../Game";

const orbBagSprite = new Image();
orbBagSprite.src = orbBag;

export default class OrbBag {
  width: number;
  height: number;
  sx: number;
  sy: number = 0;
  x: number;
  y: number;
  spriteWidth: number = orbBagSprite.width / 2;

  constructor(input: "back" | "front", game: Game) {
    this.width = orbBagSprite.width;
    this.height = orbBagSprite.height;
    if (input === "back") {
      this.sx = 0;
    } else {
      this.sx = this.spriteWidth;
    }

    this.x = game.nextOrb.x - this.spriteWidth / 2;
    this.y = game.arena.arenaFloor - this.height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      orbBagSprite,
      this.sx,
      this.sy,
      this.spriteWidth,
      this.height,
      this.x,
      this.y,
      this.spriteWidth,
      this.height
    );
  }
}
