import Game from "../Game";
import { explosionSprites } from "../spriteObjects/ExplosionSprites";

export default class OrbExplosion {
  frame: number = 1;
  x: number;
  y: number;
  sx: number = 0;
  sy: number = 0;
  shiftX: number;
  sprite: HTMLImageElement;
  spriteDrawWidth: number;
  spriteDrawHeight: number;
  color: string;
  free: boolean = true;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.sprite = explosionSprites[this.color].explosion;
    this.shiftX = explosionSprites[this.color].width;
    this.spriteDrawWidth = explosionSprites[this.color].width;
    this.spriteDrawHeight = explosionSprites[this.color].height;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.drawImage(
        this.sprite,
        this.sx,
        this.sy,
        this.spriteDrawWidth,
        this.spriteDrawHeight,
        this.x,
        this.y,
        this.spriteDrawWidth,
        this.spriteDrawHeight
      );
    }
  }

  update(ctx: CanvasRenderingContext2D | null, game: Game) {
    if (this.sx >= this.sprite.width) {
      game.explosions.delete(this);
    }
    if (this.frame % 3 === 0) this.sx += this.shiftX;
    this.draw(ctx);
    this.frame++;
  }
}
