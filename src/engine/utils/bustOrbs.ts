import OrbGraph from "../objects/OrbGraph";
import Sprite from "../objects/Sprite";

export default function bustOrbs(orbGraph: OrbGraph, sprite: Sprite) {
  if (orbGraph.bustedThisRound < 3) {
    sprite.setSheet("idle");
    return;
  }

  sprite.setSheet("jump");

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
