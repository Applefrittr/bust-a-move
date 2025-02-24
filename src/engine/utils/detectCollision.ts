import Orb from "../objects/Orb";
import OrbGraph from "../objects/OrbGraph";
import adjustOrbPositioning from "./adjustOrbPositioning";
import getDistance from "./getDistance";

export default function detectCollisions(firedOrb: Orb, orbList: OrbGraph) {
  for (const [orb] of orbList.graph) {
    if (firedOrb === orb) continue; // skip over the firedOrb itself otherwise game loop breaks
    if (getDistance(firedOrb, orb) <= orb.r + firedOrb.r) {
      console.log("collided");
      firedOrb.dx = 0;
      firedOrb.dy = 0;
      adjustOrbPositioning(firedOrb, orb);
      //orbList.addEdge(firedOrb, orb);
      break;
    }
  }
}
