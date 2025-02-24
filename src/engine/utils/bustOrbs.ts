import OrbGraph from "../objects/OrbGraph";

export default function bustOrbs(orbGraph: OrbGraph) {
  if (orbGraph.bustedThisRound < 3) {
    return;
  }

  for (const [orb] of orbGraph.graph) {
    if (orb.busted) {
      orbGraph.deleteOrb(orb);
      continue;
    }

    const neighbors = orbGraph.getNeighbors(orb);
    neighbors?.forEach((neighbor) => {
      if (neighbor.busted) neighbors.delete(neighbor);
    });
  }
}
