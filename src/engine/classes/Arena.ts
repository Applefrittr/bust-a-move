import Game from "../Game";
import { NATIVERESOLUTION } from "../utils/constantValues";

export default class Arena {
  #width: number;
  #height: number;
  #leftBound: number;
  #rightBound: number;
  #bottomBound: number;
  #topBound: number;
  #line: number;
  #arenaFloor: number;
  color: string;

  constructor(game: Game, color: string) {
    this.#width = 2 * game.orbRadius * 10;
    this.#height = 2 * game.orbRadius * 13;
    this.#topBound = NATIVERESOLUTION.height / 2 - this.#height / 2;
    this.#bottomBound = NATIVERESOLUTION.height / 2 + this.#height / 2;
    this.#leftBound = NATIVERESOLUTION.width / 2 - this.#width / 2;
    this.#rightBound = this.#leftBound + this.#width;
    this.#line = this.#bottomBound - 2 * game.orbRadius * 2;
    this.#arenaFloor = this.#bottomBound - 10;
    this.color = color;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  get leftBound() {
    return this.#leftBound;
  }

  get rightBound() {
    return this.#rightBound;
  }

  get line() {
    return this.#line;
  }

  get topBound() {
    return this.#topBound;
  }

  get arenaFloor() {
    return this.#arenaFloor;
  }

  set topBound(num: number) {
    if (num > 0) this.#topBound += num;
    else if (num === 0)
      this.#topBound = NATIVERESOLUTION.height / 2 - this.#height / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.#leftBound, this.#topBound, this.#width, this.#height);

    ctx.fillStyle = "black";
    ctx.fillRect(this.#leftBound, this.#line, this.#width, 1);
  }
}
