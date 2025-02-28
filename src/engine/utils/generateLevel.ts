import Game from "../Game";
import Orb from "../objects/Orb";
import detectNeighbors from "./detectNeighbors";
import randomNumInRange from "./randomNumInRange";

export default function generateLevel(
  game: Game,
  numOfOrbs: number,
  arenaShrinkRate: number
) {
  const orbCoordinates = new Map<string, Orb>();

  for (let i = 0; i < numOfOrbs; i++) {
    const orb = new Orb(0, game.orbRadius, game.orbRadius, 0, 0);
    orb.anchoredToArena = true;
    placeOrb(orb, orbCoordinates, game);
  }

  for (const orb of orbCoordinates.values()) {
    game.orbs.addOrb(orb);
    detectNeighbors(orb, game.orbs);
  }

  game.arenaShrinkRate = arenaShrinkRate;
}

function placeOrb(currOrb: Orb, coordinates: Map<string, Orb>, game: Game) {
  currOrb.x =
    2 * game.orbRadius +
    game.arena.leftBound +
    2 * game.orbRadius * randomNumInRange(0, 8);

  while (coordinates.has(`${currOrb.x}, ${currOrb.y}`)) {
    currOrb.anchoredToArena = false;
    let degrees;
    const placedOrb = coordinates.get(`${currOrb.x}, ${currOrb.y}`) as Orb;
    if (game.arena.rightBound - currOrb.x <= 2 * currOrb.r) degrees = -30;
    else if (currOrb.x - game.arena.leftBound <= 2 * currOrb.r) degrees = 30;
    else degrees = Math.random() >= 0.5 ? 30 : -30;
    const radAngle = (degrees * Math.PI) / 180;
    currOrb.y = placedOrb.y + Math.cos(radAngle) * (currOrb.r + placedOrb.r);
    currOrb.x = placedOrb.x + Math.sin(radAngle) * (currOrb.r + placedOrb.r);
  }
  coordinates.set(`${currOrb.x}, ${currOrb.y}`, currOrb);
}
