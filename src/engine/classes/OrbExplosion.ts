import Game from "../Game";
import { explosionSprites } from "../spriteObjects/ExplosionSprites";

export default class OrbExplosion {
  frame: number = 0;
  x: number = 0;
  y: number = 0;
  sx: number = 0;
  sy: number = 0;
  shiftX: number = 0;
  sprite: HTMLImageElement | null = null;
  spriteWidth: number = 0;
  spriteHeight: number = 0;
  color: string | null = null;
  free: boolean = true;

  constructor() {}

  // constructor(x: number, y: number, color: string) {
  //   this.x = x;
  //   this.y = y;
  //   this.color = color;

  //   this.sprite = explosionSprites[this.color].explosion;
  //   this.shiftX = explosionSprites[this.color].width;
  //   this.spriteDrawWidth = explosionSprites[this.color].width;
  //   this.spriteDrawHeight = explosionSprites[this.color].height;
  // }

  assignProps(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.sprite = explosionSprites[this.color].explosion;
    this.shiftX = explosionSprites[this.color].width;
    this.spriteWidth = explosionSprites[this.color].width;
    this.spriteHeight = explosionSprites[this.color].height;
    this.frame = 1;
    this.free = false;
  }

  resetDefault() {
    this.x = 0;
    this.y = 0;
    this.sx = 0;
    this.sy = 0;
    this.color = null;
    this.sprite = null;
    this.shiftX = 0;
    this.spriteWidth = 0;
    this.spriteHeight = 0;
    this.frame = 0;
    this.free = true;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx && this.sprite) {
      ctx.drawImage(
        this.sprite,
        this.sx,
        this.sy,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.spriteWidth,
        this.spriteHeight
      );
    }
  }

  update(ctx: CanvasRenderingContext2D | null, game: Game) {
    if (this.sprite && this.sx >= this.sprite.width) {
      game.explosions.delete(this);
      this.resetDefault();
      return;
    }
    if (this.frame % 3 === 0) this.sx += this.shiftX;
    this.draw(ctx);
    this.frame++;
  }
}
