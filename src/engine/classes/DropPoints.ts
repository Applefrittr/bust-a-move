import Game from "../Game";
import { numbers } from "../spriteObjects/NumberSprites";

export default class DropPoints {
  x: number;
  y: number;
  dy: number = 0;
  scoreDigits: number[];
  numbersSheet: HTMLImageElement = numbers.sprite;
  width: number;
  digitWidth: number = numbers.digitWidth;
  digitHeight: number = numbers.digitHieght;
  ratio: number;
  frame: number = 1;

  constructor(score: string, ratio: number) {
    this.scoreDigits = score.split("").map((digit) => Number(digit));
    this.width = this.digitWidth * this.scoreDigits.length;
    this.x = innerWidth / 2 - (ratio * this.width) / 4;
    this.y = this.digitHeight;
    this.ratio = ratio;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      const len = this.scoreDigits.length;
      for (let i = len - 1; i >= 0; i--) {
        ctx.drawImage(
          this.numbersSheet,
          this.scoreDigits[i] * this.digitWidth,
          0,
          this.digitWidth,
          this.digitHeight,
          this.x + (this.ratio * this.digitWidth * i) / 2,
          this.y,
          this.ratio * this.digitWidth,
          this.ratio * this.digitHeight
        );
      }
    }
  }

  update(ctx: CanvasRenderingContext2D | null, game: Game) {
    this.draw(ctx);
    this.frame++;
    this.y += this.dy;
    if (this.frame >= 100) this.dy = -5;
    if (this.y < 0 - this.ratio * this.digitHeight) game.dropPoints = null;
  }
}
