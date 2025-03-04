import Orb from "../classes/Orb";
import OrbExplosion from "../classes/OrbExplosion";
import OrbGraph from "../classes/OrbGraph";

export default function bustOrphanOrbs(
  orbGraph: OrbGraph,
  explosions: Set<OrbExplosion>,
  ratio: number
) {
  const anchoredOrbs = new Map<Orb, boolean | undefined>();

  for (const [orb] of orbGraph.graph) {
    const neighbors = orbGraph.getNeighbors(orb);
    if (neighbors?.size === 0 && !orb.anchoredToArena) {
      const explosion = new OrbExplosion(
        orb.x - 2 * orb.r,
        orb.y - 2 * orb.r,
        orb.color,
        ratio
      );
      explosions.add(explosion);
      orbGraph.deleteOrb(orb);
      continue;
    } else if (orb.anchoredToArena) {
      anchoredOrbs.set(orb, true);
      continue;
    } else {
      orb.recursiveVisitedFlag = true;
      const isAnchored =
        recurvDetectAnchored(anchoredOrbs, orb, orbGraph) || false;
      anchoredOrbs.set(orb, isAnchored);
    }
  }

  for (const [orb] of anchoredOrbs) {
    if (!anchoredOrbs.get(orb) && !orb.anchoredToArena) {
      const explosion = new OrbExplosion(
        orb.x - 2 * orb.r,
        orb.y - 2 * orb.r,
        orb.color,
        ratio
      );
      explosions.add(explosion);
      orbGraph.deleteOrb(orb);
    }
    orb.recursiveVisitedFlag = false;
  }
}

function recurvDetectAnchored(
  anchoredOrbs: Map<Orb, boolean | undefined>,
  orb: Orb,
  orbGraph: OrbGraph
): boolean | undefined {
  const neighbors = orbGraph.getNeighbors(orb) ?? new Set();
  for (const neighbor of neighbors) {
    if (anchoredOrbs.has(neighbor)) return anchoredOrbs.get(neighbor);
    else if (neighbor.y > orb.y || neighbor.recursiveVisitedFlag) continue;
    else if (neighbor.y <= orb.y && !neighbor.recursiveVisitedFlag) {
      neighbor.recursiveVisitedFlag = true;
      const isAnchored = recurvDetectAnchored(anchoredOrbs, neighbor, orbGraph);
      anchoredOrbs.set(neighbor, isAnchored);
      return isAnchored;
    } else return false;
  }
}
