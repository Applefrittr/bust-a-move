import Orb from "./objects/Orb";
import Cannon from "./objects/Cannon";
import detectCollisions from "./utils/detectCollision";
import Arena from "./objects/Arena";
import OrbGraph from "./objects/OrbGraph";
import detectNeighbors from "./utils/detectNeighbors";
import detectBusts from "./utils/detectBusts";
import bustOrbs from "./utils/bustOrbs";
import resetBustStatus from "./utils/resetBustStatus";
import bustOrphanOrbs from "./utils/bustOrphanOrbs";
import fireCannon from "./utils/fireCannon";
import updateCannonAmmo from "./utils/updateCannonAmmo";
import generateLevel from "./utils/generateLevel";

export default class Game {
  ctx: CanvasRenderingContext2D | null = null;
  frame: number = 0;
  paused: boolean = false;
  orbRadius: number = 25;
  orbs: OrbGraph = new OrbGraph();
  cannon: Cannon = new Cannon(50, 100);
  firedOrb: Orb | null = null;
  loadedOrb: Orb = new Orb(
    this.cannon.x + this.cannon.width / 2,
    this.cannon.y + this.cannon.height / 2,
    this.orbRadius,
    0,
    0
  );
  nextOrb: Orb = new Orb(
    this.cannon.x - (6 * this.cannon.width) / 2,
    this.cannon.y + this.cannon.height / 2,
    this.orbRadius,
    0,
    0
  );
  arena: Arena = new Arena(this.orbRadius, "#808080");

  setContext(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  keyDownEvent = (event: KeyboardEvent) => {
    console.log(this.orbs);
    this.cannon.handleKeyDown(event.key);
    if (event.key === " " && !this.firedOrb) {
      fireCannon(this, this.loadedOrb, this.nextOrb);
    }
  };

  keyUpEvent = () => {
    this.cannon.handleKeyUp();
  };

  start() {
    window.addEventListener("keydown", this.keyDownEvent);
    window.addEventListener("keyup", this.keyUpEvent);
    generateLevel(this, 100);
    this.animationLoop();
  }

  stop() {
    window.removeEventListener("keydown", this.keyDownEvent);
    window.removeEventListener("keyup", this.keyUpEvent);
    this.orbs.deleteGraph();
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
        if (this.firedOrb.dx === 0 && this.firedOrb.dy === 0) {
          detectNeighbors(this.firedOrb, this.orbs);
          detectBusts(this.firedOrb, this.orbs);
          bustOrbs(this.orbs);
          bustOrphanOrbs(this.orbs);
          resetBustStatus(this.orbs);
          this.firedOrb = null;
        }
      }

      updateCannonAmmo(this);
      for (const [orb] of this.orbs.graph) {
        orb.update(this.ctx, this.arena);
      }
    }
  };
}
