import OrbCritter from "../classes/OrbCritter";
import OrbExplosion from "../classes/OrbExplosion";
import OrbGraph from "../classes/OrbGraph";
import TenPoints from "../classes/TenPoints";

export default function bustOrbs(
  orbGraph: OrbGraph,
  explosions: Set<OrbExplosion>,
  critters: Set<OrbCritter>,
  tenPointSprites: Set<TenPoints>,
  ratio: number
) {
  if (orbGraph.bustedThisRound < 3) {
    return;
  }

  for (const [orb] of orbGraph.graph) {
    if (orb.busted) {
      orbGraph.deleteOrb(orb);
      const explosion = new OrbExplosion(
        orb.x - 2 * orb.r,
        orb.y - 2 * orb.r,
        orb.color,
        ratio
      );
      const critter = new OrbCritter(orb.x, orb.y, orb.color, ratio);
      critters.add(critter);
      explosions.add(explosion);
      setTimeout(() => {
        const tenPoints = new TenPoints(orb.x, orb.y, ratio);
        tenPointSprites.add(tenPoints);
      }, 300);
      continue;
    }

    const neighbors = orbGraph.getNeighbors(orb);
    neighbors?.forEach((neighbor) => {
      if (neighbor.busted) {
        neighbors.delete(neighbor);
      }
    });
  }
}
