// Fired orbs can only be postioning at 360, 300, 240, 180 degress relative to the orb they have collided with
import Orb from "../classes/Orb";

export default function adjustOrbPositioning(firedOrb: Orb, orb: Orb) {
  let radAngle = 0;
  let degrees = 0;
  radAngle = Math.atan2(firedOrb.x - orb.x, firedOrb.y - orb.y);
  degrees = (radAngle * 180) / Math.PI + 270;

  if (degrees >= 270 && degrees < 330) degrees = 300;
  else if (degrees >= 210 && degrees < 270) degrees = 240;
  else if (degrees >= 330 && degrees < 450) degrees = 360;
  else if (degrees >= 90 && degrees < 210) degrees = 180;

  radAngle = ((degrees - 270) * Math.PI) / 180;
  firedOrb.y = orb.y + (firedOrb.r + orb.r) * Math.cos(radAngle);
  firedOrb.x = orb.x + (firedOrb.r + orb.r) * Math.sin(radAngle);
}
