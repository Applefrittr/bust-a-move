import Game from "../Game";
import ten from "../spriteObjects/TenPointsSprite";

export default class TenPoints {
  x: number = 0;
  y: number = 0;
  dy: number = -1;
  originy: number = 0;
  sprite: HTMLImageElement | null = null;
  free: boolean = true;

  constructor() {}

  assignProps(x: number, y: number) {
    this.sprite = ten;
    this.x = x - this.sprite.width / 2;
    this.y = y - this.sprite.height / 2;
    this.originy = y;
    this.free = false;
  }

  resetDefault() {
    this.x = 0;
    this.y = 0;
    this.sprite = null;
    this.originy = 0;
    this.free = true;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx && this.sprite) {
      ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.sprite.width,
        this.sprite.height
      );
    }
  }

  update(ctx: CanvasRenderingContext2D | null, game: Game) {
    if (this.y <= this.originy - 50) {
      game.tenPointSprites.delete(this);
      this.resetDefault();
    }
    this.draw(ctx);
    this.y += this.dy;
  }
}
