import OrbCritter from "./OrbCritter";
import OrbExplosion from "./OrbExplosion";
import TenPoints from "./TenPoints";

export default class ObjectPool {
  critters: OrbCritter[] = [];
  explosions: OrbExplosion[] = [];
  tens: TenPoints[] = [];
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

    for (let i = 0; i < this.maxCount; i++) {
      const ten = new TenPoints();
      this.tens.push(ten);
    }
  }

  getFreeObject(input: "critters" | "explosions" | "tens") {
    for (let i = 0; i < this.maxCount; i++) {
      if (this[input][i].free) {
        return this[input][i];
      }
    }
  }
}
