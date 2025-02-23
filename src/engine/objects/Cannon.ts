export default class Cannon {
  width: number;
  height: number;
  x: number;
  y: number;
  deg: number;
  degDelta: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.x = innerWidth / 2 - this.width / 2;
    this.y = innerHeight - 100;
    this.deg = 0;
    this.degDelta = 0;
  }

  handleKeyDown(char: string) {
    if (char === "a") this.degDelta = -1;
    else if (char === "d") this.degDelta = 1;
    else return;
  }

  handleKeyUp() {
    this.degDelta = 0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (ctx) {
      ctx.save();
      const rad = (this.deg * Math.PI) / 180;
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(rad);
      ctx.fillStyle = "green";
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    }
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.deg + this.degDelta >= 90 || this.deg + this.degDelta <= -90)
      this.degDelta = 0;
    this.deg += this.degDelta;
    this.draw(ctx);
  }
}
