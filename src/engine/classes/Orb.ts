import randomNumInRange from "../utils/randomNumInRange";
import { orbSprites, colors } from "../spriteObjects/Orbs";
import Arena from "./Arena";
import OrbGraph from "./OrbGraph";

const SPRITES = orbSprites;

export default class Orb {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;

  color: string = colors[Math.floor(Math.random() * colors.length)];
  sprite: HTMLImageElement = SPRITES[this.color].idle;
  frame: number = 1;
  sx: number = 0;
  sy: number = 0;
  spriteDrawX: number;
  spriteDrawY: number;
  shiftX: number = 0;
  spriteWidth: number = SPRITES[this.color].width;
  spriteHeight: number = SPRITES[this.color].height;
  spriteDrawWidth: number;
  spriteDrawHeight: number;
  busted: boolean = false;
  anchoredToArena: boolean = false;
  recursiveVisitedFlag: boolean = false;
  randomIdleInterval: number = randomNumInRange(200, 300);

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
    this.sprite = SPRITES[this.color].shine;
    this.shiftX = this.spriteWidth + 1;
  }

  idle() {
    this.shiftX = this.spriteWidth + 1;
  }

  bust() {
    this.sprite = SPRITES[this.color].bust;
    this.spriteWidth = SPRITES[this.color].bustWidth;
    this.spriteHeight = SPRITES[this.color].bustHeight;
    this.shiftX = SPRITES[this.color].bustWidth + 1;
    this.spriteDrawWidth = 4 * this.r;
    this.spriteDrawHeight = 4 * this.r;
  }

  update(
    ctx: CanvasRenderingContext2D | null,
    arena: Arena,
    orbList: OrbGraph
  ) {
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
    if (this.sprite === SPRITES[this.color].bust) {
      this.spriteDrawX = this.x - 2 * this.r;
      this.spriteDrawY = this.y - 2 * this.r;
    } else {
      this.spriteDrawX = this.x - this.r;
      this.spriteDrawY = this.y - this.r;
    }

    if (this.frame % this.randomIdleInterval === 0) this.idle();
    if (this.frame % 5 === 0) {
      this.sx += this.shiftX;
      if (
        (this.sprite === SPRITES[this.color].shine &&
          this.sx >= this.sprite.width) ||
        (this.sprite === SPRITES[this.color].idle &&
          this.sx >= this.sprite.width)
      ) {
        this.sx = 0;
        this.shiftX = 0;
        this.sprite = SPRITES[this.color].idle;
      } else if (
        this.sprite === SPRITES[this.color].bust &&
        this.sx >= this.sprite.width
      )
        orbList.graph.delete(this);
    }

    this.frame++;
    this.draw(ctx);
  }
}
