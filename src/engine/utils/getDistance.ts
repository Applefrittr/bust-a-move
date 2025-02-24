import Orb from "../objects/Orb";

export default function getDistance(orb1: Orb, orb2: Orb) {
  return Math.sqrt((orb2.x - orb1.x) ** 2 + (orb2.y - orb1.y) ** 2);
}
