export default class Arena {
  #width: number;
  #height: number = innerHeight;
  #leftBound: number;
  #rightBound: number;
  #bottomBound: number = this.#height - 100;
  color: string;

  constructor(orbRadius: number, color: string) {
    this.#width = 2 * orbRadius * 10;
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

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.#leftBound, 0, this.#width, this.#height);

    ctx.fillStyle = "black";
    ctx.fillRect(this.#leftBound, this.#bottomBound, this.#width, 2);
  }
}
