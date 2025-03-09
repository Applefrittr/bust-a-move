import Game from "../Game";
import { ORBRADIUS } from "../utils/constantValues";
import Orb from "./Orb";
import OrbCritter from "./OrbCritter";
import OrbExplosion from "./OrbExplosion";
import TenPoints from "./TenPoints";

export default class ObjectPool {
  pool: {
    orbs: Orb[];
    critters: OrbCritter[];
    explosions: OrbExplosion[];
    tens: TenPoints[];
  };

  constructor() {
    this.pool = {
      orbs: new Array(100).fill(new Orb(0, 0, ORBRADIUS, 0, 0)),
      critters: new Array(100).fill(new OrbCritter(0, 0, "green")),
      explosions: new Array(100).fill(new OrbExplosion(0, 0, "green")),
      tens: new Array(100).fill(new TenPoints(0, 0)),
    };
  }

  getFreeObject(input: "orbs" | "critters" | "explosions" | "tens") {
    for (let i = 0, len = this.pool[input].length; i < len; i++) {
      if (this.pool[input][i].free) return this.pool[input][i];
    }
    switch (input) {
      case "orbs": {
        const orb = new Orb(0, 0, ORBRADIUS, 0, 0);
        this.pool["orbs"].push(orb);
        return orb;
      }
      case "critters": {
        const critter = new OrbCritter(0, 0, "green");
        this.pool["critters"].push(critter);
        return critter;
      }
      case "explosions": {
        const explosion = new OrbExplosion(0, 0, "green");
        this.pool["explosions"].push(explosion);
        return explosion;
      }
      case "tens": {
        const ten = new TenPoints(0, 0);
        this.pool["tens"].push(ten);
        return ten;
      }
    }
  }

  drawObjects(ctx: CanvasRenderingContext2D, game: Game) {
    for (const objArry of Object.values(this.pool)) {
      objArry.forEach((obj) => {
        if (obj.free) obj.update(ctx, game);
      });
    }
  }
}
