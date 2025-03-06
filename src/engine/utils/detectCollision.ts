import Orb from "../classes/Orb";
import OrbGraph from "../classes/OrbGraph";
import adjustOrbPositioning from "./adjustOrbPositioning";
import getDistance from "./getDistance";

export default function detectCollisions(firedOrb: Orb, orbGraph: OrbGraph) {
  for (const [orb] of orbGraph.graph) {
    if (firedOrb === orb) continue; // skip over the firedOrb itself otherwise game loop breaks
    if (getDistance(firedOrb, orb) <= orb.r + firedOrb.r) {
      console.log("collided");
      firedOrb.dx = 0;
      firedOrb.dy = 0;
      adjustOrbPositioning(firedOrb, orb);
      break;
    }
  }
}
