import Orb from "../objects/Orb";
import OrbGraph from "../objects/OrbGraph";

export default function detectBusts(firedOrb: Orb, orbGraph: OrbGraph) {
  const color = firedOrb.color;
  const neighbors = orbGraph.getNeighbors(firedOrb);
  recurvBusting(color, neighbors, orbGraph);
}

function recurvBusting(
  color: string,
  orbNeighbors: Set<Orb> | undefined,
  orbGraph: OrbGraph
) {
  if (!orbNeighbors) return;
  orbNeighbors.forEach((currOrb) => {
    if (color === currOrb.color && !currOrb.busted) {
      currOrb.busted = true;
      const neighbors = orbGraph.getNeighbors(currOrb);
      recurvBusting(color, neighbors, orbGraph);
    }
  });
}
