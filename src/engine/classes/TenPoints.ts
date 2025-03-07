import ten from "../spriteObjects/TenPointsSprite";

export default class TenPoints {
  x: number;
  y: number;
  dy: number = -1;
  originy: number;
  sprite: HTMLImageElement = ten;

  constructor(x: number, y: number) {
    this.x = x - this.sprite.width / 2;
    this.y = y - this.sprite.height / 2;
    this.originy = y;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.sprite.width,
        this.sprite.height
      );
    }
  }

  update(
    ctx: CanvasRenderingContext2D | null,
    tenPointSprites: Set<TenPoints>
  ) {
    this.draw(ctx);
    this.y += this.dy;
    if (this.y <= this.originy - 50) tenPointSprites.delete(this);
  }
}
