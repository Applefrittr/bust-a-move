import Orb from "../classes/Orb";
import OrbGraph from "../classes/OrbGraph";
import getDistance from "./getDistance";

export default function detectNeighbors(firedOrb: Orb, orbList: OrbGraph) {
  for (const [orb] of orbList.graph) {
    if (orb === firedOrb) continue;
    if (Math.floor(getDistance(firedOrb, orb)) <= firedOrb.r + orb.r)
      orbList.addEdge(firedOrb, orb);
  }
}
