import Arena from "./Arena";
import OrbGraph from "./OrbGraph";
import randomNumInRange from "../utils/randomNumInRange";
import { orbSprites, colors } from "../spriteObjects/OrbSprites";
import { GRAVITYPERFRAME } from "../utils/constantValues";

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
  spriteDrawX: number;
  spriteDrawY: number;
  shiftX: number = 0;
  spriteWidth: number = orbSprites[this.color].width;
  spriteHeight: number = orbSprites[this.color].height;
  spriteDrawWidth: number;
  spriteDrawHeight: number;
  busted: boolean = false;
  anchoredToArena: boolean = false;
  recursiveVisitedFlag: boolean = false;
  randomIdleInterval: number = randomNumInRange(200, 300);
  orphaned: boolean = false;

  constructor(x: number, y: number, r: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;

    this.spriteDrawX = this.x - this.r;
    this.spriteDrawY = this.y - this.r;
    this.spriteDrawWidth = 2 * this.r;
    this.spriteDrawHeight = 2 * this.r;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.strokeStyle = "transparent";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.stroke();

      ctx.drawImage(
        this.sprite,
        this.sx,
        this.sy,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteDrawX,
        this.spriteDrawY,
        this.spriteDrawWidth,
        this.spriteDrawHeight
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

  drop() {
    this.orphaned = true;
    this.dy = GRAVITYPERFRAME;
  }

  update(
    ctx: CanvasRenderingContext2D | null,
    arena: Arena,
    orbGraph?: OrbGraph
  ) {
    if (
      this.x + this.dx < arena.leftBound + this.r ||
      this.x + this.dx > arena.rightBound - this.r
    )
      this.dx = -this.dx;
    if (this.y + this.dy > innerHeight) orbGraph?.deleteOrb(this);
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
    this.spriteDrawX = this.x - this.r;
    this.spriteDrawY = this.y - this.r;

    if (this.frame % this.randomIdleInterval === 0) this.idle();
    if (this.frame % 3 === 0) {
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

    if (this.orphaned) this.dy += GRAVITYPERFRAME;
    this.frame++;
    this.draw(ctx);
  }
}
