import { explosionSprites } from "../spriteObjects/Explosions";

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
  ratio: number;

  constructor(x: number, y: number, color: string, ratio: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.ratio = ratio;

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
        this.spriteDrawWidth * this.ratio,
        this.spriteDrawHeight * this.ratio
      );
    }
  }

  update(
    ctx: CanvasRenderingContext2D | null,
    orbExplosions: Set<OrbExplosion>
  ) {
    if (this.sx >= this.sprite.width) {
      orbExplosions.delete(this);
    }
    if (this.frame % 5 === 0) this.sx += this.shiftX;
    this.draw(ctx);
    this.frame++;
  }
}
