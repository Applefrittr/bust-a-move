import Game from "../Game";

export default class Arena {
  #width: number;
  #height: number = innerHeight;
  #leftBound: number;
  #rightBound: number;
  #bottomBound: number = this.#height - 100;
  #topBound: number = 0;
  #arenaFloor: number = this.#height - 10;
  color: string;

  constructor(game: Game, color: string) {
    this.#width = 2 * game.orbRadius * 10;
    this.#leftBound = innerWidth / 2 - this.#width / 2;
    this.#rightBound = this.#leftBound + this.#width;
    this.color = color;
  }

  get width() {
    return this.#width;
  }

  get leftBound() {
    return this.#leftBound;
  }

  get rightBound() {
    return this.#rightBound;
  }

  get bottomBound() {
    return this.#bottomBound;
  }

  get topBound() {
    return this.#topBound;
  }

  get arenaFloor() {
    return this.#arenaFloor;
  }

  set topBound(num: number) {
    if (num > 0) this.#topBound += num;
    else if (num === 0) this.#topBound = num;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.#leftBound, this.#topBound, this.#width, this.#height);

    ctx.fillStyle = "black";
    ctx.fillRect(this.#leftBound, this.#bottomBound, this.#width, 2);
  }
}
