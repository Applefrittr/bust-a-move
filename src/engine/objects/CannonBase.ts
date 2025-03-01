import Cannon from "../../assets/cannon-base-sheet.png";
import Arena from "./Arena";

const cannonBaseSprite = new Image();
cannonBaseSprite.src = Cannon;

export default class CannonBase {
  width: number = 2 * cannonBaseSprite.width;
  height: number = 2 * cannonBaseSprite.height;
  frame: number = cannonBaseSprite.width / 12;
  shiftX: number = 0;
  x: number = innerWidth / 2 - this.frame;
  y: number;
  sx: number = 0;
  sy: number = 0;

  constructor(arena: Arena) {
    this.y = arena.arenaFloor - this.height - 10;
  }

  handleKeyDown(char: string) {
    if (char === "a") this.shiftX = -this.frame;
    else if (char === "d") this.shiftX = this.frame;
    else return;
  }

  handleKeyUp() {
    this.shiftX = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      cannonBaseSprite,
      this.sx,
      this.sy,
      this.frame,
      this.height,
      this.x,
      this.y,
      this.frame * 2,
      2 * this.height
    );
  }

  update(ctx: CanvasRenderingContext2D) {
    this.sx += this.shiftX;
    if (this.sx >= cannonBaseSprite.width) this.sx = 0;
    else if (this.sx <= 0) this.sx = cannonBaseSprite.width - this.frame;
    this.draw(ctx);
  }
}
