import CannonBarrel from "../../assets/cannon-barrel.png";
import Game from "../Game";
import { NATIVERESOLUTION } from "../utils/constantValues";

const cannonBarrel = new Image();
cannonBarrel.src = CannonBarrel;

export default class Cannon {
  width: number;
  height: number;
  x: number;
  y: number;
  deg: number = 0;
  degDelta: number = 0;

  constructor(game: Game) {
    this.width = cannonBarrel.width;
    this.height = cannonBarrel.height;
    this.x = NATIVERESOLUTION.width / 2 - this.width / 2;
    this.y = game.arena.arenaFloor - this.height + 5;
  }

  handleKeyDown(char: string) {
    if (char === "a") this.degDelta = -2;
    else if (char === "d") this.degDelta = 2;
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
