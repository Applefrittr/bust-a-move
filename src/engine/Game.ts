import Arena from "./classes/Arena";
import Cannon from "./classes/Cannon";
import CannonBase from "./classes/CannonBase";
import CannonLoader from "./classes/CannonLoader";
import CannonOperator from "./classes/CannonOperator";
import DropPoints from "./classes/DropPoints";
import FPSController from "./classes/FPSController";
import Orb from "./classes/Orb";
import OrbBag from "./classes/OrbBag";
import OrbCritter from "./classes/OrbCritter";
import OrbExplosion from "./classes/OrbExplosion";
import OrbGraph from "./classes/OrbGraph";
import TenPoints from "./classes/TenPoints";
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

export default class Game {
  ctx: CanvasRenderingContext2D | null = null;
  frame: number = 0;
  gameOverFlag: boolean = false;
  lvlComplete: boolean = false;
  paused: boolean = false;
  orbRadius: number = 8;
  score: number = 0;
  orbToSpriteRatio: number;
  arena: Arena;
  arenaShrinkRate: number = 0;
  orbs: OrbGraph = new OrbGraph();
  cannon: Cannon;
  cannonBase: CannonBase;
  firedOrb: Orb | null = null;
  loadedOrb: Orb;
  nextOrb: Orb;
  fpsController: FPSController = new FPSController();
  msNow: number = this.fpsController.msPrev;
  cannonOperatorSprite: CannonOperator;
  cannonLoaderSprite: CannonLoader;
  orbBagBack: OrbBag;
  orbBagFront: OrbBag;
  explosions: Set<OrbExplosion> = new Set();
  critters: Set<OrbCritter> = new Set();
  tenPointSprites: Set<TenPoints> = new Set();
  dropPoints: DropPoints | null = null;

  constructor(ratio: number) {
    this.orbRadius *= ratio;
    this.orbToSpriteRatio = ratio;
    this.arena = new Arena(this, "#808080");
    this.cannon = new Cannon(this);
    this.cannonBase = new CannonBase(this);
    this.loadedOrb = new Orb(
      this.cannon.x + this.cannon.width / 2,
      this.cannon.y + this.cannon.height / 2,
      this.orbRadius,
      0,
      0
    );
    this.nextOrb = new Orb(
      this.cannon.x - 5 * this.orbRadius,
      this.arena.arenaFloor - this.orbRadius,
      this.orbRadius,
      0,
      0
    );
    this.cannonOperatorSprite = new CannonOperator(this);
    this.cannonLoaderSprite = new CannonLoader(this);
    this.orbBagBack = new OrbBag("back", this);
    this.orbBagFront = new OrbBag("front", this);
  }

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
    generateLevel(this, 1, 0.05);
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
          bustOrbs(this);
          bustOrphanOrbs(this);
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

      this.tenPointSprites.forEach((sprite) =>
        sprite.update(this.ctx, this.tenPointSprites)
      );

      this.critters.forEach((critter) =>
        critter.update(this.ctx, this.critters)
      );

      this.orbBagFront.draw(this.ctx);

      this.cannonOperatorSprite.update(this.ctx);

      this.dropPoints?.update(this.ctx, this);

      if (this.orbs.graph.size === 0 && this.explosions.size === 0)
        this.nextLevel();
      if (detectGameOver(this)) this.gameOver();
    }
  };
}
