import Game from "../Game";
import { NATIVERESOLUTION, ORBRADIUS } from "../utils/constantValues";
import Arena1 from "../../assets/arena/bg-lvl1-arena.png";
import Floor1 from "../../assets/arena/bg-lvl1-floor.png";
import Arena2 from "../../assets/arena/bg-lvl2-arena.png";
import Floor2 from "../../assets/arena/bg-lvl2-floor.png";
import Arena3 from "../../assets/arena/bg-lvl3-arena.png";
import Floor3 from "../../assets/arena/bg-lvl3-floor.png";
import Arena4 from "../../assets/arena/bg-lvl4-arena.png";
import Floor4 from "../../assets/arena/bg-lvl4-floor.png";
import Arena5 from "../../assets/arena/bg-lvl5-arena.png";
import Floor5 from "../../assets/arena/bg-lvl5-floor.png";
import preLoadSprite from "../utils/preLoadSprite";

const arena1 = await preLoadSprite(Arena1);
const floor1 = await preLoadSprite(Floor1);
const arena2 = await preLoadSprite(Arena2);
const floor2 = await preLoadSprite(Floor2);
const arena3 = await preLoadSprite(Arena3);
const floor3 = await preLoadSprite(Floor3);
const arena4 = await preLoadSprite(Arena4);
const floor4 = await preLoadSprite(Floor4);
const arena5 = await preLoadSprite(Arena5);
const floor5 = await preLoadSprite(Floor5);

const levels = [
  { arena: arena1, floor: floor1 },
  { arena: arena2, floor: floor2 },
  { arena: arena3, floor: floor3 },
  { arena: arena4, floor: floor4 },
  { arena: arena5, floor: floor5 },
];
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
  arenaSprite: HTMLImageElement | null = null;
  floorSprite: HTMLImageElement | null = null;

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

  pickLevel(level: number) {
    const currLevel = (level - 1) % levels.length;
    this.arenaSprite = levels[currLevel].arena;
    this.floorSprite = levels[currLevel].floor;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.arenaSprite && this.floorSprite) {
      ctx.drawImage(
        this.arenaSprite,
        0,
        0,
        this.arenaSprite.width,
        this.arenaSprite.height,
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
        this.floorSprite,
        0,
        0,
        this.floorSprite.width,
        this.floorSprite.height,
        this.leftBound - this.floorSprite.width / 4,
        this.arenaFloor,
        this.floorSprite.width,
        this.floorSprite.height
      );

      ctx.fillStyle = "#242424";
      ctx.fillRect(
        0 - innerWidth,
        this.arenaFloor + this.floorSprite.height,
        2 * innerWidth,
        innerHeight
      );
    }
  }

  update(ctx: CanvasRenderingContext2D) {
    this.draw(ctx);
    this.#topBound += this.shrinkRate;
  }
}
