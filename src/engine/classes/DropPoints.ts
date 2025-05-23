import Game from "../Game";
import { numbers } from "../spriteObjects/NumberSprites";
import { NATIVERESOLUTION } from "../utils/constantValues";
//import PointsMulti from "../../assets/sounds/points-multi.mp3";

export default class DropPoints {
  x: number;
  y: number;
  dy: number = 0;
  scoreDigits: number[];
  sprite: HTMLImageElement = numbers.green;
  numberSheets: HTMLImageElement[] = [
    numbers.green,
    numbers.blue,
    numbers.red,
    numbers.yellow,
  ];
  width: number;
  digitWidth: number = numbers.digitWidth;
  digitHeight: number = numbers.digitHieght;
  frame: number = 1;

  constructor(score: string) {
    this.scoreDigits = score.split("").map((digit) => Number(digit));
    this.width = this.digitWidth * this.scoreDigits.length;
    this.x = NATIVERESOLUTION.width / 2 - this.width / 4;
    this.y = this.digitHeight;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      const len = this.scoreDigits.length;
      for (let i = len - 1; i >= 0; i--) {
        ctx.drawImage(
          this.sprite,
          this.scoreDigits[i] * this.digitWidth,
          0,
          this.digitWidth,
          this.digitHeight,
          this.x + (this.digitWidth * i) / 2,
          this.y,
          this.digitWidth,
          this.digitHeight
        );
      }
    }
  }

  update(ctx: CanvasRenderingContext2D | null, game: Game) {
    this.draw(ctx);
    this.frame++;
    this.y += this.dy;
    this.sprite = this.numberSheets[this.frame % this.numberSheets.length];
    if (this.frame >= 60) this.dy = -5;
    if (this.y < 0 - this.digitHeight) game.dropPoints = null;
  }
}
