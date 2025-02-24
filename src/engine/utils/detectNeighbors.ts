import Orb from "../objects/Orb";
import OrbGraph from "../objects/OrbGraph";
import getDistance from "./getDistance";

export default function detectNeighbors(firedOrb: Orb, orbList: OrbGraph) {
  for (const [orb] of orbList.graph) {
    if (orb === firedOrb) continue;
    if (Math.round(getDistance(firedOrb, orb)) === firedOrb.r + orb.r)
      orbList.addEdge(firedOrb, orb);
  }
}
