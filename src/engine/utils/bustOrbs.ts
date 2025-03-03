import OrbGraph from "../classes/OrbGraph";
//import Sprite from "../objects/Sprite";

export default function bustOrbs(orbGraph: OrbGraph) {
  if (orbGraph.bustedThisRound < 3) {
    return;
  }

  for (const [orb] of orbGraph.graph) {
    if (orb.busted) {
      orb.bust();
    }

    const neighbors = orbGraph.getNeighbors(orb);
    neighbors?.forEach((neighbor) => {
      if (neighbor.busted) neighbor.bust();
    });
  }
}
