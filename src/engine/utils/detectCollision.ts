import Orb from "../objects/Orb";
import OrbGraph from "../objects/OrbGraph";
import adjustOrbPositioning from "./adjustOrbPositioning";

export default function detectCollisions(firedOrb: Orb, orbList: OrbGraph) {
  for (const [orb] of orbList.graph) {
    if (firedOrb === orb) continue; // skip over the firedOrb itself otherwise game loop breaks
    if (getDistance(firedOrb, orb) <= orb.r + firedOrb.r) {
      console.log("collided");
      firedOrb.dx = 0;
      firedOrb.dy = 0;
      adjustOrbPositioning(firedOrb, orb);
      orbList.addEdge(firedOrb, orb);
      break;
    }
  }
}

function getDistance(orb1: Orb, orb2: Orb) {
  return Math.sqrt((orb2.x - orb1.x) ** 2 + (orb2.y - orb1.y) ** 2);
}
