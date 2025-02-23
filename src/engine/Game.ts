import Orb from "./objects/Orb";
import Cannon from "./objects/Cannon";
import detectCollisions from "./utils/detectCollision";
import Arena from "./objects/Arena";
// import randomNumInRange from "./utils/randomNumInRange";

export default class Game {
  ctx: CanvasRenderingContext2D | null;
  frame: number;
  paused: boolean;
  orbs: Orb[];
  firedOrb: Orb | null;
  orbRadius: number = 25;
  cannon: Cannon;
  arena: Arena;

  constructor() {
    this.ctx = null;
    this.frame = 0;
    this.paused = false;
    this.orbs = [];
    this.firedOrb = null;
    this.cannon = new Cannon(50, 100);
    this.arena = new Arena(this.orbRadius, "#808080");
  }

  setContext(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  keyDownEvent = (event: KeyboardEvent) => {
    this.cannon.handleKeyDown(event.key);
    if (event.key === " " && !this.firedOrb) {
      const orb = new Orb(
        this.cannon.x + this.cannon.width / 2,
        this.cannon.y + this.cannon.height / 2,
        this.orbRadius,
        10 * Math.cos(((-90 + this.cannon.deg) * Math.PI) / 180),
        10 * Math.sin(((-90 + this.cannon.deg) * Math.PI) / 180)
      );
      this.firedOrb = orb;
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

      this.arena.draw(this.ctx);
      this.cannon.update(this.ctx);

      if (this.firedOrb) {
        detectCollisions(this.firedOrb, this.orbs);
        this.firedOrb.update(this.ctx, this.arena);
        if (this.firedOrb.dx === 0 && this.firedOrb.dy === 0) {
          this.orbs.push(this.firedOrb);
          this.firedOrb = null;
        }
      }
      this.orbs.forEach((currOrb) => currOrb.update(this.ctx, this.arena));
    }
  };
}
