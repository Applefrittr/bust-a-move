import Orb from "../objects/Orb";
import OrbGraph from "../objects/OrbGraph";

export default function bustOrphanOrbs(orbGraph: OrbGraph) {
  const anchoredOrbs = new Map<Orb, boolean | undefined>();

  for (const [orb] of orbGraph.graph) {
    const neighbors = orbGraph.getNeighbors(orb);
    if (neighbors?.size === 0 && !orb.anchoredToArena) {
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
    if (!anchoredOrbs.get(orb) && !orb.anchoredToArena) orbGraph.deleteOrb(orb);
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
