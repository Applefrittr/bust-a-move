import randomNumInRange from "../utils/randomNumInRange";
import { GRAVITYPERFRAME } from "../utils/constantValues";
import { critterSprites } from "../spriteObjects/OrbCritterSprites";
import Game from "../Game";

export default class OrbCritter {
  x: number = 0;
  y: number = 0;
  dx: number = 0;
  dy: number = 0;
  sx: number = 0;
  sy: number = 0;
  spriteWidth: number = 0;
  spriteHeight: number = 0;
  color: string | null = null;
  sprite: HTMLImageElement | null = null;
  frame: number = 0;
  free: boolean = true;

  constructor() {}

  assignProps(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.dx = randomNumInRange(-2, 2);
    this.dy = -4;
    this.color = color;
    this.sprite = critterSprites[this.color].sprite;
    this.spriteWidth = critterSprites[this.color].width;
    this.spriteHeight = critterSprites[this.color].height;
    this.frame = 1;
    this.free = false;
  }

  resetDefault() {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.sx = 0;
    this.sy = 0;
    this.color = null;
    this.sprite = null;
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
    if (this.y >= game.arena.arenaFloor) {
      game.critters.delete(this);
      this.resetDefault();
      return;
    }
    this.draw(ctx);
    this.dy += GRAVITYPERFRAME;
    this.y += this.dy;
    this.x += this.dx;
    if (this.frame % 3 === 0) {
      this.sx += this.spriteWidth;
      if (this.sprite && this.sx >= this.sprite.width) this.sx = 0;
    }
    this.frame++;
  }
}
