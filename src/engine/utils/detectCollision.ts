import Orb from "../objects/Orb";
import adjustOrbPositioning from "./adjustOrbPositioning";

export default function detectCollisions(orb: Orb, orbList: Orb[]) {
  for (let i = 0, len = orbList.length; i < len; i++) {
    if (getDistance(orb, orbList[i]) <= orb.r + orbList[i].r) {
      orb.dx = 0;
      orb.dy = 0;
      adjustOrbPositioning(orb, orbList[i]);
      break;
    }
  }
}

function getDistance(orb1: Orb, orb2: Orb) {
  return Math.sqrt((orb2.x - orb1.x) ** 2 + (orb2.y - orb1.y) ** 2);
}
