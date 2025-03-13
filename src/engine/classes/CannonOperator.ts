import TuringCannon from "../../assets/spriteSheets/green-turning-cannon.png";
import CannonWheel from "../../assets/spriteSheets/cannon-wheel.png";
import Idle from "../../assets/spriteSheets/green-idle.png";
import KOd from "../../assets/spriteSheets/green-ko.png";
import Game from "../Game";
import { NATIVERESOLUTION } from "../utils/constantValues";
import preLoadSprite from "../utils/preLoadSprite";

const turningCannonSprite = await preLoadSprite(TuringCannon);
const idleSprite = await preLoadSprite(Idle);
const cannonWheel = await preLoadSprite(CannonWheel);
const knockedOutSprite = await preLoadSprite(KOd);

export default class CannonOperator {
  spriteSheet: HTMLImageElement = idleSprite;
  spriteWidth: number;
  spriteHeight: number;
  spriteSourceWidth: number = this.spriteSheet.width;
  spriteShiftX: number = 0;
  spriteX: number;
  spriteY: number;
  spriteSX: number = 0;
  spriteSY: number = 0;
  wheelWidth: number;
  wheelHeight: number;
  wheelSourceWidth: number = cannonWheel.width / 8;
  wheelShiftX: number = 0;
  wheelX: number;
  wheelY: number;
  wheelSX: number = 0;
  wheelSY: number = 0;
  frame: number = 0;

  constructor(game: Game) {
    this.spriteWidth = this.spriteSheet.width;
    this.spriteHeight = this.spriteSheet.height;
    this.spriteX = NATIVERESOLUTION.width / 2 + this.spriteSourceWidth / 2;
    this.spriteY = game.arena.arenaFloor - this.spriteHeight;

    this.wheelWidth = cannonWheel.width;
    this.wheelHeight = cannonWheel.height;
    this.wheelX = NATIVERESOLUTION.width / 2 + this.spriteSourceWidth / 2;
    this.wheelY = game.arena.arenaFloor - this.wheelHeight;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      cannonWheel,
      this.wheelSX,
      this.wheelSY,
      this.wheelSourceWidth,
      this.wheelHeight,
      this.wheelX,
      this.wheelY,
      this.wheelSourceWidth,
      this.wheelHeight
    );

    ctx.drawImage(
      this.spriteSheet,
      this.spriteSX,
      this.spriteSY,
      this.spriteSourceWidth,
      this.spriteHeight,
      this.spriteX,
      this.spriteY,
      this.spriteSourceWidth,
      this.spriteHeight
    );
  }

  handleKeyDown(char: string, controls: { [action: string]: string }) {
    if (char !== controls.left && char !== controls.right) return;
    this.spriteSheet = turningCannonSprite;
    if (char === controls.left) {
      this.spriteShiftX = -this.spriteSourceWidth;
      this.wheelShiftX = -this.wheelSourceWidth;
    } else {
      this.spriteShiftX = this.spriteSourceWidth;
      this.wheelShiftX = this.wheelSourceWidth;
    }
  }

  handleKeyUp() {
    this.spriteSheet = idleSprite;
    this.spriteShiftX = 0;
    this.wheelShiftX = 0;
    this.spriteSX = 0;
    this.wheelSX = 0;
  }

  idle() {
    this.spriteSheet = idleSprite;
    this.spriteSX = 0;
    this.spriteShiftX = 0;
  }

  knocked() {
    this.spriteSheet = knockedOutSprite;
    this.spriteShiftX = this.spriteSourceWidth;
  }

  update(ctx: CanvasRenderingContext2D) {
    this.frame++;
    this.draw(ctx);
    if (this.frame % 3 === 0) {
      if (this.spriteSheet === turningCannonSprite) {
        this.spriteSX += this.spriteShiftX;
        this.wheelSX += this.wheelShiftX;
        if (this.spriteSX >= turningCannonSprite.width) {
          this.spriteSX = 0;
          this.wheelSX = 0;
        } else if (this.spriteSX < 0) {
          this.spriteSX = turningCannonSprite.width - this.spriteSourceWidth;
          this.wheelSX = cannonWheel.width - this.wheelSourceWidth;
        }
      } else if (this.spriteSheet === knockedOutSprite) {
        this.spriteSX += this.spriteShiftX;
        if (this.spriteSX >= knockedOutSprite.width) {
          this.spriteSX = 0;
        }
      }
    }
  }
}
