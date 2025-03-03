import orbBag from "../../assets/orbBag.png";
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
  ratio: number;

  constructor(input: "back" | "front", game: Game) {
    this.ratio = game.orbToSpriteRatio;
    this.width = this.ratio * orbBagSprite.width;
    this.height = this.ratio * orbBagSprite.height;
    if (input === "back") {
      this.sx = 0;
    } else {
      this.sx = this.spriteWidth;
    }

    this.x = game.nextOrb.x - (this.ratio * this.spriteWidth) / 2;
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
      this.ratio * this.spriteWidth,
      this.ratio * this.height
    );
  }
}
