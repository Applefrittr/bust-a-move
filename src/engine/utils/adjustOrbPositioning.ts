// Fired orbs can only be postioning at -90, -30, 30, 90 degress relative to the orb they have collided with
import Orb from "../classes/Orb";

export default function adjustOrbPositioning(firedOrb: Orb, orb: Orb) {
  let radAngle = 0;
  let degrees = 0;
  if (Math.abs(firedOrb.x - orb.x) <= firedOrb.r + orb.r / 2) {
    radAngle = Math.atan((firedOrb.x - orb.x) / (firedOrb.y - orb.y));
    degrees = (radAngle * 180) / Math.PI;
    if (degrees >= -75 && degrees < 0) degrees = -30;
    else if (degrees >= 0 && degrees <= 75) degrees = 30;
    radAngle = (degrees * Math.PI) / 180;
    firedOrb.x = orb.x + (firedOrb.r + orb.r) * Math.sin(radAngle);
    firedOrb.y = orb.y + (firedOrb.r + orb.r) * Math.cos(radAngle);
  } else if (Math.abs(firedOrb.x - orb.x) >= firedOrb.r + orb.r / 2) {
    radAngle = Math.atan((firedOrb.y - orb.y) / (firedOrb.x - orb.x));
    degrees = (radAngle * 180) / Math.PI;
    if (firedOrb.x > orb.x) {
      degrees = 0;
    } else {
      degrees = 180;
    }
    radAngle = (degrees * Math.PI) / 180;
    firedOrb.y = orb.y + (firedOrb.r + orb.r) * Math.sin(radAngle);
    firedOrb.x = orb.x + (firedOrb.r + orb.r) * Math.cos(radAngle);
  }
}
