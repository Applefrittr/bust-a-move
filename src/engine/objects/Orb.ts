import randomNumInRange from "../utils/randomNumInRange";
import Arena from "./Arena";

//const COLORS = ["red", "yellow", "orange", "purple", "blue"];
const COLORS = ["red", "blue", "orange"];

export default class Orb {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;
  color: string = COLORS[randomNumInRange(0, COLORS.length - 1)];
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
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  update(ctx: CanvasRenderingContext2D | null, arena: Arena) {
    if (
      this.x + this.dx < arena.leftBound + this.r ||
      this.x + this.dx > arena.rightBound - this.r
    )
      this.dx = -this.dx;
    if (this.y + this.dy > innerHeight) this.dy = -this.dy;
    if (this.y + this.dy < 0 + this.r) {
      this.dx = 0;
      this.dy = 0;
      this.y = this.r;
      this.x =
        arena.leftBound +
        Math.floor((this.x + this.r / 2 - arena.leftBound) / (2 * this.r)) *
          (2 * this.r);
      this.anchoredToArena = true;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw(ctx);
  }
}
