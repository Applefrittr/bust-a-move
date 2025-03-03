import FiringCannon from "../../assets/blue-firing-cannon.png";
//import cannonLauncher from "../../assets/cannon-launcher.png";
import CannonLauncher from "../../assets/cannon-launcher.png";
import Idle from "../../assets/blue-idle.png";
import Game from "../Game";

const firingCannonSprite = new Image();
firingCannonSprite.src = FiringCannon;

const idleSprite = new Image();
idleSprite.src = Idle;

const cannonLauncher = new Image();
cannonLauncher.src = CannonLauncher;

export default class CannonLoader {
  spriteSheet: HTMLImageElement = idleSprite;
  spriteWidth: number;
  spriteHeight: number;
  spriteSourceWidth: number = this.spriteSheet.width;
  spriteShiftX: number = 0;
  spriteX: number;
  spriteY: number;
  spriteSX: number = 0;
  spriteSY: number = 0;
  launcherWidth: number;
  launcherHeight: number;
  launcherSourceWidth: number = cannonLauncher.width / 4;
  launcherShiftX: number = 0;
  launcherX: number;
  launcherY: number;
  launcherSX: number = 0;
  launcherSY: number = 0;
  frame: number = 0;
  ratio: number;

  constructor(game: Game) {
    this.ratio = game.orbToSpriteRatio;
    this.spriteWidth = this.ratio * this.spriteSheet.width;
    this.spriteHeight = this.ratio * this.spriteSheet.height;
    this.spriteX = innerWidth / 2 - this.ratio * this.spriteSourceWidth - 10;
    this.spriteY = game.arena.arenaFloor - this.spriteHeight;

    this.launcherWidth = this.ratio * cannonLauncher.width;
    this.launcherHeight = this.ratio * cannonLauncher.height;
    this.launcherX =
      innerWidth / 2 - (this.ratio * this.launcherSourceWidth) / 2 + 5;
    this.launcherY = game.arena.arenaFloor - this.launcherHeight - 5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      cannonLauncher,
      this.launcherSX,
      this.launcherSY,
      this.launcherSourceWidth,
      this.launcherHeight,
      this.launcherX,
      this.launcherY,
      this.ratio * this.launcherSourceWidth,
      this.ratio * this.launcherHeight
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
    if (char !== " ") return;
    this.spriteSheet = firingCannonSprite;
    this.spriteShiftX = this.spriteSourceWidth;
    this.launcherShiftX = this.launcherSourceWidth;
    this.frame = 0;
  }

  update(ctx: CanvasRenderingContext2D) {
    this.frame++;
    this.draw(ctx);
    if (this.frame % 7 === 0) {
      this.spriteSX += this.spriteShiftX;
      this.launcherSX += this.launcherShiftX;
      if (this.spriteSX >= firingCannonSprite.width) {
        this.spriteSheet = idleSprite;
        this.spriteSX = 0;
        this.spriteShiftX = 0;
      }
      if (this.launcherSX >= cannonLauncher.width) {
        this.launcherSX = 0;
        this.launcherShiftX = 0;
      }
    }
  }
}
