import randomNumInRange from "../utils/randomNumInRange";
import { GRAVITYPERFRAME } from "../utils/constantValues";
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
  frame: number = 1;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.sprite = critterSprites[this.color].sprite;
    this.spriteWidth = critterSprites[this.color].width;
    this.spriteHeight = critterSprites[this.color].height;
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
        this.spriteWidth,
        this.spriteHeight
      );
    }
  }

  update(ctx: CanvasRenderingContext2D | null, game: Game) {
    this.draw(ctx);
    this.dy += GRAVITYPERFRAME;
    this.y += this.dy;
    this.x += this.dx;
    if (this.y >= innerHeight) game.critters.delete(this);
    if (this.frame % 3 === 0) {
      this.sx += this.spriteWidth;
      if (this.sx >= this.sprite.width) this.sx = 0;
    }
    this.frame++;
  }
}
