import FiringCannon from "../../assets/spriteSheets/blue-firing-cannon.png";
import CannonLauncher from "../../assets/spriteSheets/cannon-launcher.png";
import Idle from "../../assets/spriteSheets/blue-idle.png";
import KOd from "../../assets/spriteSheets/blue-ko.png";
import preLoadSprite from "../utils/preLoadSprite";
import Game from "../Game";
import { NATIVERESOLUTION } from "../utils/constantValues";

const firingCannonSprite = await preLoadSprite(FiringCannon);
const idleSprite = await preLoadSprite(Idle);
const cannonLauncher = await preLoadSprite(CannonLauncher);
const knockedOutSprite = await preLoadSprite(KOd);

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

  constructor(game: Game) {
    this.spriteWidth = this.spriteSheet.width;
    this.spriteHeight = this.spriteSheet.height;
    this.spriteX = NATIVERESOLUTION.width / 2 - this.spriteSourceWidth - 2;
    this.spriteY = game.arena.arenaFloor - this.spriteHeight;

    this.launcherWidth = cannonLauncher.width;
    this.launcherHeight = cannonLauncher.height;
    this.launcherX = NATIVERESOLUTION.width / 2 - this.launcherSourceWidth / 2;
    this.launcherY = game.arena.arenaFloor - this.launcherHeight - 2;
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
      this.launcherSourceWidth,
      this.launcherHeight
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

  handleKeyDown(char: string) {
    if (char !== " ") return;
    this.spriteSheet = firingCannonSprite;
    this.spriteShiftX = this.spriteSourceWidth;
    this.launcherShiftX = this.launcherSourceWidth;
    this.frame = 0;
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
      if (this.spriteSheet === firingCannonSprite) {
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
      } else if (this.spriteSheet === knockedOutSprite) {
        this.spriteSX += this.spriteShiftX;
        if (this.spriteSX >= knockedOutSprite.width) {
          this.spriteSX = 0;
        }
      }
    }
  }
}
