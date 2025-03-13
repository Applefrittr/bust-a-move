import Arena from "./classes/Arena";
import AudioPool from "./classes/AudioPool";
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
import ObjectPool from "./classes/ObjectPool";
import TenPoints from "./classes/TenPoints";
import bustOrbs from "./utils/bustOrbs";
import bustOrphanOrbs from "./utils/bustOrphanOrbs";
import drawBackGround from "./utils/drawBackground";
import drawGameOverMsg from "./utils/drawGameOverMsg";
import drawRoundCompleteMsg from "./utils/drawRoundCompleteMsg";
import drawRoundStartMsg from "./utils/drawrRoundStartMsg";
import detectBusts from "./utils/detectBusts";
import detectCollisions from "./utils/detectCollision";
import detectGameOver from "./utils/detectGameOver";
import detectNeighbors from "./utils/detectNeighbors";
import fireCannon from "./utils/fireCannon";
import generateLevel from "./utils/generateLevel";
import resetBustStatus from "./utils/resetBustStatus";
import shiftOrbsWithArena from "./utils/shiftOrbsWithArena";
import updateCannonAmmo from "./utils/updateCannonAmmo";
import {
  DELAY,
  NATIVERESOLUTION,
  ORBRADIUS,
  SHRINKRATE,
} from "./utils/constantValues";
import { OptionsObj } from "../components/Context";

export default class Game {
  arena: Arena;
  arenaShrinkRate: number = 0;
  audioPool: AudioPool;
  ctx: CanvasRenderingContext2D | null = null;
  cannon: Cannon;
  cannonBase: CannonBase;
  cannonLoaderSprite: CannonLoader;
  cannonOperatorSprite: CannonOperator;
  colorRange: number;
  controls: { [action: string]: string } = { left: "a", right: "d", fire: " " };
  critters: Set<OrbCritter> = new Set();
  dropPoints: DropPoints | null = null;
  explosions: Set<OrbExplosion> = new Set();
  firedOrb: Orb | null = null;
  fpsController: FPSController = new FPSController();
  frame: number = 0;
  gameOverFlag: boolean = false;
  height: number;
  level: number;
  loadedOrb: Orb | null = null;
  msNow: number = this.fpsController.msPrev;
  music: boolean = true;
  nextOrb: Orb | null = null;
  orbs: OrbGraph = new OrbGraph();
  orbBagBack: OrbBag;
  orbBagFront: OrbBag;
  orbRadius: number = ORBRADIUS;
  paused: boolean = false;
  pool: ObjectPool;
  roundComplete: boolean = false;
  roundScore: number = 0;
  roundStart: boolean = false;
  sfx: boolean = true;
  transformOrigin: { x: number; y: number };
  transformScaler: number;
  score: number = 0;
  tenPointSprites: Set<TenPoints> = new Set();
  width: number;

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
    this.level = 1;
    this.colorRange = 1;

    this.audioPool = new AudioPool();
    this.pool = new ObjectPool();
    this.arena = new Arena(this, "#000000");
    this.cannon = new Cannon(this);
    this.cannonBase = new CannonBase(this);

    this.cannonOperatorSprite = new CannonOperator(this);
    this.cannonLoaderSprite = new CannonLoader(this);
    this.orbBagBack = new OrbBag("back", this);
    this.orbBagFront = new OrbBag("front", this);
  }

  setContext(ctx: CanvasRenderingContext2D | null) {
    this.ctx = ctx;
  }

  setOptions(options: OptionsObj) {
    this.sfx = options.sfx;
    this.music = options.music;
    this.controls.left = options.left;
    this.controls.right = options.right;
    this.controls.fire = options.fire;
  }

  keyDownEvent = (event: KeyboardEvent) => {
    this.cannon.handleKeyDown(event.key, this.controls);
    this.cannonBase.handleKeyDown(event.key, this.controls);
    this.cannonOperatorSprite.handleKeyDown(event.key, this.controls);
    this.cannonLoaderSprite.handleKeyDown(event.key, this.controls);
    if (event.key === this.controls.fire && !this.firedOrb) {
      fireCannon(this);
    }
  };

  keyUpEvent = () => {
    this.cannon.handleKeyUp();
    this.cannonBase.handleKeyUp();
    this.cannonOperatorSprite.handleKeyUp();
  };

  start() {
    if ((this.level - 1) % 5 === 0) this.colorRange++;
    generateLevel(this);
    this.arena.pickLevel(this.level);
    if (this.sfx) this.audioPool.playSound("ready");
    this.roundComplete = false;
    this.roundScore = 0;
    this.roundStart = true;

    setTimeout(() => {
      if (this.sfx) this.audioPool.playSound("go");
      this.arenaShrinkRate = SHRINKRATE;
      this.arena.shrinkRate = SHRINKRATE;
      window.addEventListener("keydown", this.keyDownEvent);
      window.addEventListener("keyup", this.keyUpEvent);
      this.roundStart = false;
    }, 3500);
  }

  nextLevel() {
    this.roundComplete = true;
    this.arenaShrinkRate = 0;
    this.arena.shrinkRate = 0;
    window.removeEventListener("keydown", this.keyDownEvent);
    window.removeEventListener("keyup", this.keyUpEvent);
    this.loadedOrb = null;
    this.nextOrb = null;
    setTimeout(() => {
      this.arena.resetArena(this);
      this.level += 1;
      this.start();
    }, DELAY);
  }

  gameOver() {
    this.gameOverFlag = true;
    this.arenaShrinkRate = 0;
    this.arena.shrinkRate = 0;
    this.cannonOperatorSprite.knocked();
    this.cannonLoaderSprite.knocked();
    window.removeEventListener("keydown", this.keyDownEvent);
    window.removeEventListener("keyup", this.keyUpEvent);
  }

  restart() {
    this.gameOverFlag = false;
    this.score = 0;
    this.level = 1;
    this.colorRange = 1;
    this.orbs.deleteGraph();
    this.loadedOrb = null;
    this.nextOrb = null;
    this.cannonOperatorSprite.idle();
    this.cannonLoaderSprite.idle();
    this.arena.resetArena(this);
    this.start();
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

      drawBackGround(this);

      this.arena.update(this.ctx);
      shiftOrbsWithArena(this);

      this.orbBagBack.draw(this.ctx);
      this.cannonBase.update(this.ctx);
      this.cannon.update(this.ctx);

      if (this.firedOrb) {
        detectCollisions(this.firedOrb, this.orbs);
        if (this.firedOrb.dx === 0 && this.firedOrb.dy === 0) {
          if (this.sfx) this.audioPool.playSound("collide");
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

      if (
        this.orbs.graph.size === 0 &&
        this.explosions.size === 0 &&
        !this.roundComplete
      ) {
        this.nextLevel();
      }

      if (this.roundComplete) {
        drawRoundCompleteMsg(this);
      }

      if (this.roundStart) {
        drawRoundStartMsg(this);
      }

      if (this.gameOverFlag) {
        drawGameOverMsg(this);
      }

      if (detectGameOver(this)) this.gameOver();

      this.ctx.resetTransform();
    }
  };
}
