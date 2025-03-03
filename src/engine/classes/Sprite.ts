import Green from "../../assets/green-sprite.png";
import Idle from "../../assets/green-idle.png";
import Look from "../../assets/green-look.png";
import Jump from "../../assets/green-celebrate.png";

const sprite = new Image();
sprite.src = Green;

const idle = new Image();
idle.src = Idle;

const look = new Image();
look.src = Look;

const jump = new Image();
jump.src = Jump;

export default class Sprite {
  sprite: CanvasImageSource = idle;
  x: number;
  y: number;
  dx: number = 0;
  dy: number = 0;
  sx: number = 0;
  sy: number = 0;
  shiftX: number = 49;
  shiftY: number = 0;
  frame: number = 1;
  idleAnimation: boolean = false;
  jumpHeight: number = 10;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.sprite,
      this.sx,
      this.sy,
      49,
      49,
      this.x,
      this.y,
      100,
      100
    );
  }

  setSheet(input: "idle" | "look" | "jump") {
    this.sx = 0;
    this.shiftX = 49;
    if (input === "idle") this.sprite = idle;
    else if (input === "look") this.sprite = look;
    else {
      this.dy = -5;
      this.sprite = jump;
    }
  }

  idle() {
    this.sx += this.shiftX;
    if (this.sx >= 2 * 49) this.shiftX = -this.shiftX;
    if (this.sx <= 0) {
      this.shiftX = -this.shiftX;
      this.idleAnimation = false;
    }
  }

  lookUp() {
    this.sx += this.shiftX;
    if (this.sx >= 3 * 49) this.sx = 2 * 49;
  }

  jump() {
    this.sx += this.shiftX;
    if (this.sx >= 49) this.sx = 49;
    this.y += this.dy;
    this.jumpHeight += this.dy;
    if (this.jumpHeight === 0) this.dy = -this.dy;
    if (this.jumpHeight === 10) {
      this.dy = 0;
      this.setSheet("idle");
    }
  }

  update(ctx: CanvasRenderingContext2D) {
    console.log(this.frame);
    if (this.frame % 10 === 0) {
      if (this.sprite === idle) {
        if (this.frame % 200 === 0) this.idleAnimation = true;
        if (this.idleAnimation) {
          this.idle();
        }
      } else if (this.sprite === look) {
        this.lookUp();
      } else {
        this.jump();
      }
    }
    this.draw(ctx);
    this.frame++;
  }
}
