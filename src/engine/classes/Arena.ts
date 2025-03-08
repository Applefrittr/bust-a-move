import Game from "../Game";
import { NATIVERESOLUTION, ORBRADIUS } from "../utils/constantValues";
import arenaBG from "../../assets/bg-lvl1-arena.png";
import arenaBorder from "../../assets/bg-lvl1-border.png";
import floor from "../../assets/bg-lvl1-floor.png";

const ArenaBG = new Image();
ArenaBG.src = arenaBG;

const ArenaBorder = new Image();
ArenaBorder.src = arenaBorder;

const Floor = new Image();
Floor.src = floor;

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
  shrinkRate: number = 0;

  constructor(game: Game, color: string) {
    this.#width = 2 * game.orbRadius * 10;
    this.#height = 2 * game.orbRadius * 13;
    this.#topBound = NATIVERESOLUTION.height / 2 - this.#height / 2;
    this.#bottomBound = NATIVERESOLUTION.height / 2 + this.#height / 2;
    this.#leftBound = NATIVERESOLUTION.width / 2 - this.#width / 2;
    this.#rightBound = this.#leftBound + this.#width;
    this.#line = this.#bottomBound - 2 * game.orbRadius * 2;
    this.#arenaFloor = this.#bottomBound - 2;
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

  resetArena(game: Game) {
    this.#height = 2 * game.orbRadius * 13;
    this.#topBound = NATIVERESOLUTION.height / 2 - this.#height / 2;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      ArenaBG,
      0,
      0,
      ArenaBG.width,
      ArenaBG.height,
      this.#leftBound - ORBRADIUS,
      this.#topBound - ORBRADIUS,
      this.#width + 2 * ORBRADIUS,
      this.#height + ORBRADIUS
    );

    ctx.fillStyle = "white";
    ctx.fillRect(
      this.#leftBound - ORBRADIUS,
      this.#line,
      this.#width + 2 * ORBRADIUS,
      0.5
    );

    ctx.drawImage(
      Floor,
      0,
      0,
      Floor.width,
      Floor.height,
      this.leftBound - Floor.width / 4,
      this.arenaFloor,
      Floor.width,
      Floor.height
    );

    ctx.fillStyle = "#242424";
    ctx.fillRect(
      0 - innerWidth,
      this.arenaFloor + Floor.height,
      2 * innerWidth,
      innerHeight
    );
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    this.#topBound += this.shrinkRate;
  }
}
