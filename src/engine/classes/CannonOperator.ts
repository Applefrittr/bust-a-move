import TuringCannon from "../../assets/green-turning-cannon.png";
import CannonWheel from "../../assets/cannon-wheel.png";
import Idle from "../../assets/green-idle.png";
import Game from "../Game";
import { NATIVERESOLUTION } from "../utils/constantValues";

const turningCannonSprite = new Image();
turningCannonSprite.src = TuringCannon;

const idleSprite = new Image();
idleSprite.src = Idle;

const cannonWheel = new Image();
cannonWheel.src = CannonWheel;

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
  ratio: number;

  constructor(game: Game) {
    this.ratio = game.orbToSpriteRatio;
    this.spriteWidth = this.ratio * this.spriteSheet.width;
    this.spriteHeight = this.ratio * this.spriteSheet.height;
    this.spriteX =
      NATIVERESOLUTION.width / 2 + (this.ratio * this.spriteSourceWidth) / 2;
    this.spriteY = game.arena.arenaFloor - this.spriteHeight;

    this.wheelWidth = this.ratio * cannonWheel.width;
    this.wheelHeight = this.ratio * cannonWheel.height;
    this.wheelX =
      NATIVERESOLUTION.width / 2 + (this.ratio * this.spriteSourceWidth) / 2;
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
      this.ratio * this.wheelSourceWidth,
      this.ratio * this.wheelHeight
    );

    ctx.drawImage(
      this.spriteSheet,
      this.spriteSX,
      this.spriteSY,
      this.spriteSourceWidth,
      this.spriteHeight,
      this.spriteX,
      this.spriteY,
      this.ratio * this.spriteSourceWidth,
      this.ratio * this.spriteHeight
    );
  }

  handleKeyDown(char: string) {
    if (char !== "a" && char !== "d") return;
    this.spriteSheet = turningCannonSprite;
    if (char === "a") {
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

  update(ctx: CanvasRenderingContext2D) {
    this.frame++;
    this.draw(ctx);
    if (this.frame % 5 === 0) {
      this.spriteSX += this.spriteShiftX;
      this.wheelSX += this.wheelShiftX;
      if (this.spriteSX >= turningCannonSprite.width) {
        this.spriteSX = 0;
        this.wheelSX = 0;
      } else if (this.spriteSX < 0) {
        this.spriteSX = turningCannonSprite.width - this.spriteSourceWidth;
        this.wheelSX = cannonWheel.width - this.wheelSourceWidth;
      }
    }
  }
}
