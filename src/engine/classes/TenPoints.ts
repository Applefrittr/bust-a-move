import ten from "../spriteObjects/TenPointsSprite";

export default class TenPoints {
  x: number;
  y: number;
  dy: number = -1;
  originy: number;
  sprite: HTMLImageElement = ten;
  ratio: number;

  constructor(x: number, y: number, ratio: number) {
    this.x = x - this.sprite.width / 2;
    this.y = y - this.sprite.height / 2;
    this.originy = y;
    this.ratio = ratio;
  }

  draw(ctx: CanvasRenderingContext2D | null) {
    if (ctx) {
      ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.ratio * this.sprite.width,
        this.ratio * this.sprite.height
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
