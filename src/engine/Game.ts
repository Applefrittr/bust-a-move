import Arena from "./classes/Arena";
import Cannon from "./classes/Cannon";
import CannonBase from "./classes/CannonBase";
import FPSController from "./classes/FPSController";
import Orb from "./classes/Orb";
import OrbGraph from "./classes/OrbGraph";
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
import { delay } from "./utils/constantValues";
//import Sprite from "./objects/Sprite";
import OrbBag from "./classes/OrbBag";
import CannonOperator from "./classes/CannonOperator";
import CannonLoader from "./classes/CannonLoader";
import OrbExplosion from "./classes/OrbExplosion";
import OrbCritter from "./classes/OrbCritter";

export default class Game {
  ctx: CanvasRenderingContext2D | null = null;
  frame: number = 0;
  paused: boolean = false;
  orbRadius: number = 25;
  orbToSpriteRatio: number = this.orbRadius / 8;
  arena: Arena = new Arena(this, "#808080");
  arenaShrinkRate: number = 0;
  orbs: OrbGraph = new OrbGraph();
  cannon: Cannon = new Cannon(this);
  cannonBase: CannonBase = new CannonBase(this);
  firedOrb: Orb | null = null;
  loadedOrb: Orb = new Orb(
    this.cannon.x + this.cannon.width / 2,
    this.cannon.y + this.cannon.height / 2,
    this.orbRadius,
    0,
    0
  );
  nextOrb: Orb = new Orb(
    this.cannon.x - 5 * this.orbRadius,
    this.arena.arenaFloor - this.orbRadius,
    this.orbRadius,
    0,
    0
  );
  fpsController: FPSController = new FPSController();
  lvlComplete: boolean = false;
  gameOverFlag: boolean = false;
  msNow: number = this.fpsController.msPrev;
  cannonOperatorSprite = new CannonOperator(this);
  cannonLoaderSprite = new CannonLoader(this);
  orbBagBack = new OrbBag("back", this);
  orbBagFront = new OrbBag("front", this);
  explosions: Set<OrbExplosion> = new Set();
  critters: Set<OrbCritter> = new Set();

  constructor() {}

  setContext(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  keyDownEvent = (event: KeyboardEvent) => {
    console.log(this.orbs);
    this.cannon.handleKeyDown(event.key);
    this.cannonBase.handleKeyDown(event.key);
    this.cannonOperatorSprite.handleKeyDown(event.key);
    this.cannonLoaderSprite.handleKeyDown(event.key);
    if (event.key === " " && !this.firedOrb) {
      fireCannon(this, this.loadedOrb, this.nextOrb);
    }
  };

  keyUpEvent = () => {
    this.cannon.handleKeyUp();
    this.cannonBase.handleKeyUp();
    this.cannonOperatorSprite.handleKeyUp();
  };

  start() {
    window.addEventListener("keydown", this.keyDownEvent);
    window.addEventListener("keyup", this.keyUpEvent);
    generateLevel(this, 10, 0.05);
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
      this.orbBagBack.draw(this.ctx);
      this.cannonBase.update(this.ctx);
      this.cannon.update(this.ctx);

      if (this.firedOrb) {
        detectCollisions(this.firedOrb, this.orbs);
        if (this.firedOrb.dx === 0 && this.firedOrb.dy === 0) {
          this.firedOrb.shine();
          detectNeighbors(this.firedOrb, this.orbs);
          detectBusts(this.firedOrb, this.orbs);
          bustOrbs(
            this.orbs,
            this.explosions,
            this.critters,
            this.orbToSpriteRatio
          );
          bustOrphanOrbs(this.orbs);
          resetBustStatus(this.orbs);
          this.firedOrb = null;
        }
      }

      this.cannonLoaderSprite.update(this.ctx);

      updateCannonAmmo(this);
      for (const [orb] of this.orbs.graph) {
        orb.update(this.ctx, this.arena, this.orbs);
      }
      this.explosions.forEach((explosion) =>
        explosion.update(this.ctx, this.explosions)
      );

      this.critters.forEach((critter) =>
        critter.update(this.ctx, this.critters)
      );

      this.orbBagFront.draw(this.ctx);

      this.cannonOperatorSprite.update(this.ctx);
      if (this.orbs.graph.size === 0 && this.explosions.size === 0)
        this.nextLevel();
      if (detectGameOver(this)) this.gameOver();
    }
  };
}
