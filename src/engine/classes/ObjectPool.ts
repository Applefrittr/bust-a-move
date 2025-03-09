import Game from "../Game";
// import { ORBRADIUS } from "../utils/constantValues";
// import Orb from "./Orb";
import OrbCritter from "./OrbCritter";
import OrbExplosion from "./OrbExplosion";
// import OrbExplosion from "./OrbExplosion";
// import TenPoints from "./TenPoints";

export default class ObjectPool {
  critters: OrbCritter[] = [];
  explosions: OrbExplosion[] = [];
  maxCount = 100;

  constructor() {
    for (let i = 0; i < this.maxCount; i++) {
      const critter = new OrbCritter();
      this.critters.push(critter);
    }
    for (let i = 0; i < this.maxCount; i++) {
      const explosion = new OrbExplosion();
      this.explosions.push(explosion);
    }
  }

  getFreeObject(input: "critters" | "explosions") {
    let obj;
    for (let i = 0; i < this.maxCount; i++) {
      if (this[input][i].free) {
        obj = this[input][i];
        break;
      }
    }

    return obj;
    // switch (input) {
    //   // case "orbs": {
    //   //   const orb = new Orb(0, 0, ORBRADIUS, 0, 0);
    //   //   this.pool["orbs"].push(orb);
    //   //   return orb;
    //   // }
    //   case "critters": {
    //     const critter = new OrbCritter();
    //     this.pool["critters"].push(critter);
    //     return critter;
    //}
    // case "explosions": {
    //   const explosion = new OrbExplosion(0, 0, "green");
    //   this.pool["explosions"].push(explosion);
    //   return explosion;
    // }
    // case "tens": {
    //   const ten = new TenPoints(0, 0);
    //   this.pool["tens"].push(ten);
    //   return ten;
    // }
    //}
  }

  drawObjects(ctx: CanvasRenderingContext2D, game: Game) {
    // for (const objArry of Object.values(this.pool)) {
    //   objArry.forEach((obj) => {
    //     if (!obj.free) obj.update(ctx, game);
    //   });
    // }
    for (let i = 0; i < this.maxCount; i++) {
      if (!this.critters[i].free) this.critters[i].update(ctx, game);
    }

    for (let i = 0; i < this.maxCount; i++) {
      if (!this.explosions[i].free) this.explosions[i].update(ctx, game);
    }
  }
}
