import randomNumInRange from "../utils/randomNumInRange";
import { gravityPerFrame } from "../utils/constantValues";
import { critterSprites } from "../spriteObjects/OrbCritterSprites";
import Game from "../Game";

export default class OrbCritter {
  x: number;
  y: number;
  dx: number = randomNumInRange(-2, 2);
  dy: number = -4;
  sx: number = 0;
  sy: number = 0;
  spriteWidth: number = 0;
  spriteHeight: number = 0;
  color: string;
  sprite: HTMLImageElement;
  ratio: number;
  frame: number = 1;

  constructor(x: number, y: number, color: string, ratio: number) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.sprite = critterSprites[this.color].sprite;
    this.spriteWidth = critterSprites[this.color].width;
    this.spriteHeight = critterSprites[this.color].height;
    this.ratio = ratio;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.drawImage(
        this.sprite,
        this.sx,
        this.sy,
        this.spriteWidth,
        this.spriteHeight,
        this.x,
        this.y,
        this.ratio * this.spriteWidth,
        this.ratio * this.spriteHeight
      );
    }
  }

  update(ctx: CanvasRenderingContext2D | null, game: Game) {
    this.draw(ctx);
    this.dy += gravityPerFrame;
    this.y += this.dy;
    this.x += this.dx;
    if (this.y >= game.arena.arenaFloor) game.critters.delete(this);
    if (this.frame % 5 === 0) {
      this.sx += this.spriteWidth;
      if (this.sx >= this.sprite.width) this.sx = 0;
    }
    this.frame++;
  }
}
