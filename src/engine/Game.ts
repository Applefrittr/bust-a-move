import Orb from "./objects/Orb";
import Cannon from "./objects/Cannon";
// import randomNumInRange from "./utils/randomNumInRange";

export default class Game {
  ctx: CanvasRenderingContext2D | null;
  frame: number;
  paused: boolean;
  orbs: Orb[];
  cannon: Cannon;

  constructor() {
    this.ctx = null;
    this.frame = 0;
    this.paused = false;
    this.orbs = [];
    this.cannon = new Cannon(50, 100);
  }

  setContext(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  generateOrbs() {}

  keyDownEvent = (event: KeyboardEvent) => {
    this.cannon.handleKeyDown(event.key);
    if (event.key === " ") {
      const orb = new Orb(
        this.cannon.x + this.cannon.width / 2,
        this.cannon.y + this.cannon.height / 2,
        25,
        10 * Math.cos(((-90 + this.cannon.deg) * Math.PI) / 180),
        10 * Math.sin(((-90 + this.cannon.deg) * Math.PI) / 180)
      );
      this.orbs.push(orb);
    }
  };

  keyUpEvent = () => {
    this.cannon.handleKeyUp();
  };

  start() {
    window.addEventListener("keydown", this.keyDownEvent);
    window.addEventListener("keyup", this.keyUpEvent);
    this.animationLoop();
  }

  stop() {
    window.removeEventListener("keydown", this.keyDownEvent);
    window.removeEventListener("keyup", this.keyUpEvent);
    cancelAnimationFrame(this.frame);
  }

  togglePause() {
    if (this.paused) {
      requestAnimationFrame(this.animationLoop);
      window.addEventListener("keydown", this.keyDownEvent);
      window.addEventListener("keyup", this.keyUpEvent);
    } else {
      cancelAnimationFrame(this.frame);
      window.removeEventListener("keydown", this.keyDownEvent);
      window.removeEventListener("keyup", this.keyUpEvent);
    }
    this.paused = !this.paused;
  }

  animationLoop = () => {
    if (this.ctx) {
      this.frame = requestAnimationFrame(this.animationLoop);
      this.ctx.clearRect(0, 0, innerWidth, innerHeight);
      this.cannon.update(this.ctx);
      this.orbs.forEach((orb) => orb.update(this.ctx));
    }
  };
}
