import Arena from "./Arena";
import randomNumInRange from "../utils/randomNumInRange";

import { orbSprites, colors } from "../spriteObjects/Orbs";

export default class Orb {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;

  color: string = colors[Math.floor(Math.random() * colors.length)];
  sprite: HTMLImageElement = orbSprites[this.color].idle;
  frame: number = 1;
  sx: number = 0;
  sy: number = 0;
  shiftX: number = 0;
  spriteWidth: number = orbSprites[this.color].width;
  spriteHeight: number = orbSprites[this.color].height;
  randomIdleInterval: number = randomNumInRange(200, 300);

  busted: boolean = false;
  anchoredToArena: boolean = false;
  recursiveVisitedFlag: boolean = false;

  constructor(x: number, y: number, r: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.drawImage(
        this.sprite,
        this.sx,
        this.sy,
        this.spriteWidth,
        this.spriteHeight,
        this.x - this.r,
        this.y - this.r,
        2 * this.r,
        2 * this.r
      );
    }
  }

  shine() {
    this.sprite = orbSprites[this.color].shine;
    this.shiftX = this.spriteWidth + 1;
  }

  idle() {
    this.shiftX = this.spriteWidth + 1;
  }

  update(ctx: CanvasRenderingContext2D | null, arena: Arena) {
    if (
      this.x + this.dx < arena.leftBound + this.r ||
      this.x + this.dx > arena.rightBound - this.r
    )
      this.dx = -this.dx;
    if (this.y + this.dy > innerHeight) this.dy = -this.dy;
    if (this.y + this.dy <= arena.topBound + this.r) {
      this.dx = 0;
      this.dy = 0;
      this.y = arena.topBound + this.r;
      this.x =
        arena.leftBound +
        Math.floor((this.x + this.r / 2 - arena.leftBound) / (2 * this.r)) *
          (2 * this.r);
      this.anchoredToArena = true;
    }
    this.x += this.dx;
    this.y += this.dy;

    if (this.frame % this.randomIdleInterval === 0) this.idle();
    if (this.frame % 5 === 0) {
      this.sx += this.shiftX;
      if (
        (this.sprite === orbSprites[this.color].shine &&
          this.sx >= this.sprite.width) ||
        (this.sprite === orbSprites[this.color].idle &&
          this.sx >= this.sprite.width)
      ) {
        this.sx = 0;
        this.shiftX = 0;
        this.sprite = orbSprites[this.color].idle;
      }
    }

    this.frame++;
    this.draw(ctx);
  }
}
