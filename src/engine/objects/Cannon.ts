import CannonBarrel from "../../assets/cannon-barrel.png";
import Arena from "./Arena";

const cannonBarrel = new Image();
cannonBarrel.src = CannonBarrel;

export default class Cannon {
  width: number;
  height: number;
  x: number;
  y: number;
  deg: number = 0;
  degDelta: number = 0;

  constructor(arena: Arena) {
    this.width = 2 * cannonBarrel.width;
    this.height = 2 * cannonBarrel.height;
    this.x = innerWidth / 2 - this.width / 2;
    this.y = arena.arenaFloor - 2 * cannonBarrel.height;
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
      //ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.drawImage(
        cannonBarrel,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
      ctx.restore();
    }
  }

  update(ctx: CanvasRenderingContext2D) {
    if (this.deg + this.degDelta >= 80 || this.deg + this.degDelta <= -80)
      this.degDelta = 0;
    this.deg += this.degDelta;
    this.draw(ctx);
  }
}
