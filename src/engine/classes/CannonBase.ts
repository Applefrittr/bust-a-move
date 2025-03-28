import Cannon from "../../assets/spriteSheets/cannon-base-sheet.png";
import Game from "../Game";
import { NATIVERESOLUTION } from "../utils/constantValues";

const cannonBaseSprite = new Image();
cannonBaseSprite.src = Cannon;

export default class CannonBase {
  width: number;
  height: number;
  spriteWidth: number = cannonBaseSprite.width / 12;
  shiftX: number = 0;
  x: number;
  y: number;
  sx: number = 0;
  sy: number = 0;
  frame: number = 0;

  constructor(game: Game) {
    this.width = cannonBaseSprite.width;
    this.height = cannonBaseSprite.height;
    this.x = NATIVERESOLUTION.width / 2 - this.spriteWidth / 2;
    this.y = game.arena.arenaFloor - this.height;
  }

  handleKeyDown(char: string, controls: { [action: string]: string }) {
    if (char === controls.left) this.shiftX = -this.spriteWidth;
    else if (char === controls.right) this.shiftX = this.spriteWidth;
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
      this.spriteWidth,
      this.height,
      this.x,
      this.y,
      this.spriteWidth,
      this.height
    );
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.frame % 5 === 0) {
      this.sx += this.shiftX;
      if (this.sx >= cannonBaseSprite.width) this.sx = 0;
      else if (this.sx <= 0)
        this.sx = cannonBaseSprite.width - this.spriteWidth;
    }
    this.frame++;
    this.draw(ctx);
  }
}
