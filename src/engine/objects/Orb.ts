export default class Orb {
  x: number;
  y: number;
  dx: number;
  dy: number;
  r: number;

  constructor(x: number, y: number, r: number, dx: number, dy: number) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.dx = dx;
    this.dy = dy;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  update(ctx: CanvasRenderingContext2D | null) {
    if (this.x + this.dx < 0 + this.r || this.x + this.dx > innerWidth - this.r)
      this.dx = -this.dx;
    if (this.y + this.dy > innerHeight) this.dy = -this.dy;
    if (this.y + this.dy < 0 + this.r) {
      this.dx = 0;
      this.dy = 0;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.draw(ctx);
  }
}
