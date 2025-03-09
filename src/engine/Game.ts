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
import bustOrbs from "./utils/bustOrbs";
import bustOrphanOrbs from "./utils/bustOrphanOrbs";
//import drawBackGround from "./utils/drawBackground";
import detectBusts from "./utils/detectBusts";
import detectCollisions from "./utils/detectCollision";
import detectGameOver from "./utils/detectGameOver";
import detectNeighbors from "./utils/detectNeighbors";
import fireCannon from "./utils/fireCannon";
import generateLevel from "./utils/generateLevel";
import resetBustStatus from "./utils/resetBustStatus";
import shiftOrbsWithArena from "./utils/shiftOrbsWithArena";
import updateCannonAmmo from "./utils/updateCannonAmmo";
import { DELAY, NATIVERESOLUTION, ORBRADIUS } from "./utils/constantValues";
import ObjectPool from "./classes/ObjectPool";

export default class Game {
  arena: Arena;
  arenaShrinkRate: number = 0;
  ctx: CanvasRenderingContext2D | null = null;
  cannon: Cannon;
  cannonBase: CannonBase;
  cannonLoaderSprite: CannonLoader;
  cannonOperatorSprite: CannonOperator;
  critters: Set<OrbCritter> = new Set();
  dropPoints: DropPoints | null = null;
  explosions: Set<OrbExplosion> = new Set();
  firedOrb: Orb | null = null;
  fpsController: FPSController = new FPSController();
  frame: number = 0;
  gameOverFlag: boolean = false;
  height: number;
  level: number = 1;
  loadedOrb: Orb;
  lvlComplete: boolean = false;
  msNow: number = this.fpsController.msPrev;
  nextOrb: Orb;
  orbs: OrbGraph = new OrbGraph();
  orbBagBack: OrbBag;
  orbBagFront: OrbBag;
  orbRadius: number = ORBRADIUS;
  paused: boolean = false;
  transformOrigin: { x: number; y: number };
  transformScaler: number;
  score: number = 0;
  tenPointSprites: Set<TenPoints> = new Set();
  width: number;
  pool: ObjectPool;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.transformScaler = Math.min(
      width / NATIVERESOLUTION.width,
      height / NATIVERESOLUTION.height
    );
    this.transformOrigin = {
      x: (width - NATIVERESOLUTION.width * this.transformScaler) / 2,
      y: (height - NATIVERESOLUTION.height * this.transformScaler) / 2,
    };

    this.arena = new Arena(this, "#000000");
    this.cannon = new Cannon(this);
    this.cannonBase = new CannonBase(this);
    this.pool = new ObjectPool();

    this.loadedOrb = new Orb(
      this.cannon.x + this.cannon.width / 2,
      this.cannon.y + this.cannon.height / 2,
      this.orbRadius,
      0,
      0
    );
    // this.loadedOrb = this.pool.getFreeObject("orbs") as Orb;
    // this.loadedOrb.x = this.cannon.x + this.cannon.width / 2;
    // this.loadedOrb.y = this.cannon.y + this.cannon.height / 2;
    // this.loadedOrb.free = false;

    this.nextOrb = new Orb(
      this.cannon.x - 5 * this.orbRadius,
      this.arena.arenaFloor - this.orbRadius,
      this.orbRadius,
      0,
      0
    );
    // this.nextOrb = this.pool.getFreeObject("orbs") as Orb;
    // this.nextOrb.x = this.cannon.x - 5 * this.orbRadius;
    // this.nextOrb.y = this.arena.arenaFloor - this.orbRadius;
    // this.nextOrb.free = false;

    this.cannonOperatorSprite = new CannonOperator(this);
    this.cannonLoaderSprite = new CannonLoader(this);
    this.orbBagBack = new OrbBag("back", this);
    this.orbBagFront = new OrbBag("front", this);
  }

  setContext(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  keyDownEvent = (event: KeyboardEvent) => {
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
    generateLevel(this, 5, 0.05);
    this.animationLoop();
  }

  nextLevel() {
    this.lvlComplete = true;
    this.stop();
    setTimeout(() => {
      this.lvlComplete = false;
      this.arena.resetArena(this);
      this.level += 1;
      this.start();
    }, DELAY);
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

      this.ctx.clearRect(0, 0, this.width, this.height);

      this.ctx.setTransform(
        this.transformScaler,
        0,
        0,
        this.transformScaler,
        this.transformOrigin.x,
        this.transformOrigin.y
      );

      //drawBackGround(this);

      this.arena.update(this.ctx);
      shiftOrbsWithArena(this);

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
        orb.update(this.ctx, this);
      }
      this.explosions.forEach((explosion) => explosion.update(this.ctx, this));

      this.tenPointSprites.forEach((sprite) => sprite.update(this.ctx, this));

      this.critters.forEach((critter) => critter.update(this.ctx, this));

      this.orbBagFront.draw(this.ctx);

      this.cannonOperatorSprite.update(this.ctx);

      this.dropPoints?.update(this.ctx, this);

      if (this.orbs.graph.size === 0 && this.explosions.size === 0)
        this.nextLevel();
      if (detectGameOver(this)) this.gameOver();

      this.ctx.resetTransform();
    }
  };
}
