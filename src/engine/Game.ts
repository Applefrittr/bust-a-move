import Arena from "./objects/Arena";
import Cannon from "./objects/Cannon";
import CannonBase from "./objects/CannonBase";
import FPSController from "./objects/FPSController";
import Orb from "./objects/Orb";
import OrbGraph from "./objects/OrbGraph";
import arenaShrink from "./utils/arenaShrink";
import bustOrbs from "./utils/bustOrbs";
import bustOrphanOrbs from "./utils/bustOrphanOrbs";
import detectBusts from "./utils/detectBusts";
import detectCollisions from "./utils/detectCollision";
import detectGameOver from "./utils/detectGameOver";
import detectNeighbors from "./utils/detectNeighbors";
import fireCannon from "./utils/fireCannon";
import generateLevel from "./utils/generateLevel";
import resetBustStatus from "./utils/resetBustStatus";
import updateCannonAmmo from "./utils/updateCannonAmmo";
import { delay } from "./utils/lvlCompleteTimeoutDelay";
import Sprite from "./objects/Sprite";

export default class Game {
  ctx: CanvasRenderingContext2D | null = null;
  frame: number = 0;
  paused: boolean = false;
  orbRadius: number = 25;
  arena: Arena = new Arena(this, "#808080");
  arenaShrinkRate: number = 0;
  orbs: OrbGraph = new OrbGraph();
  cannon: Cannon = new Cannon(this.arena);
  cannonBase: CannonBase = new CannonBase(this.arena);
  firedOrb: Orb | null = null;
  loadedOrb: Orb = new Orb(
    this.cannon.x + this.cannon.width / 2,
    this.cannon.y + this.cannon.height / 2,
    this.orbRadius,
    0,
    0
  );
  nextOrb: Orb = new Orb(
    this.cannon.x - 150,
    this.cannon.y + this.cannon.height / 2,
    this.orbRadius,
    0,
    0
  );
  fpsController: FPSController = new FPSController();
  lvlComplete: boolean = false;
  gameOverFlag: boolean = false;
  msNow: number = this.fpsController.msPrev;
  greenSprite = new Sprite(innerWidth / 2 + 50, this.arena.arenaFloor - 100);

  constructor() {}

  setContext(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  keyDownEvent = (event: KeyboardEvent) => {
    console.log(this.orbs);
    this.cannon.handleKeyDown(event.key);
    this.cannonBase.handleKeyDown(event.key);
    if (event.key === " " && !this.firedOrb) {
      fireCannon(this, this.loadedOrb, this.nextOrb);
      this.greenSprite.setSheet("look");
    }
  };

  keyUpEvent = () => {
    this.cannon.handleKeyUp();
    this.cannonBase.handleKeyUp();
  };

  start() {
    window.addEventListener("keydown", this.keyDownEvent);
    window.addEventListener("keyup", this.keyUpEvent);
    generateLevel(this, 10, 0.01);
    this.animationLoop();
  }

  nextLevel() {
    this.lvlComplete = true;
    this.stop();
    setTimeout(() => {
      this.lvlComplete = false;
      this.arena.topBound = 0;
      this.start();
    }, delay);
  }

  gameOver() {
    this.gameOverFlag = true;
    window.removeEventListener("keydown", this.keyDownEvent);
    window.removeEventListener("keyup", this.keyUpEvent);
    cancelAnimationFrame(this.frame);
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

      this.msNow = this.fpsController.msPrev;
      if (!this.fpsController.renderFrame()) return;

      this.ctx.clearRect(0, 0, innerWidth, innerHeight);

      arenaShrink(this);

      this.arena.draw(this.ctx);
      this.cannonBase.update(this.ctx);
      this.cannon.update(this.ctx);

      if (this.firedOrb) {
        detectCollisions(this.firedOrb, this.orbs);
        if (this.firedOrb.dx === 0 && this.firedOrb.dy === 0) {
          detectNeighbors(this.firedOrb, this.orbs);
          detectBusts(this.firedOrb, this.orbs);
          bustOrbs(this.orbs, this.greenSprite);
          bustOrphanOrbs(this.orbs);
          resetBustStatus(this.orbs);
          this.firedOrb = null;
          if (this.orbs.graph.size === 0) this.nextLevel();
        }
      }

      updateCannonAmmo(this);
      for (const [orb] of this.orbs.graph) {
        orb.update(this.ctx, this.arena);
      }

      this.greenSprite.update(this.ctx);
      if (detectGameOver(this)) this.gameOver();
    }
  };
}
