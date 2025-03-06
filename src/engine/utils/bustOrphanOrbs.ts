import DropPoints from "../classes/DropPoints";
import Orb from "../classes/Orb";
import OrbGraph from "../classes/OrbGraph";
import Game from "../Game";

export default function bustOrphanOrbs(game: Game) {
  const anchoredOrbs = new Map<Orb, boolean | undefined>();

  let numDropped = 0;

  for (const [orb] of game.orbs.graph) {
    const neighbors = game.orbs.getNeighbors(orb);
    if (neighbors?.size === 0 && !orb.anchoredToArena) {
      orb.drop();
      numDropped++;
      continue;
    } else if (orb.anchoredToArena) {
      anchoredOrbs.set(orb, true);
      continue;
    } else {
      orb.recursiveVisitedFlag = true;
      const isAnchored =
        recurvDetectAnchored(anchoredOrbs, orb, game.orbs) || false;
      anchoredOrbs.set(orb, isAnchored);
    }
  }

  for (const [orb] of anchoredOrbs) {
    if (!anchoredOrbs.get(orb) && !orb.anchoredToArena) {
      numDropped++;
      orb.drop();
    }
    orb.recursiveVisitedFlag = false;
  }

  if (numDropped) {
    let droppedScore = 20;
    for (let i = 1; i < numDropped; i++) {
      droppedScore *= 2;
    }
    game.dropPoints = new DropPoints(droppedScore.toString());
    game.score += droppedScore;
  }
}

function recurvDetectAnchored(
  anchoredOrbs: Map<Orb, boolean | undefined>,
  orb: Orb,
  orbGraph: OrbGraph
): boolean | undefined {
  const neighbors = orbGraph.getNeighbors(orb) ?? new Set();
  for (const neighbor of neighbors) {
    if (anchoredOrbs.has(neighbor)) return anchoredOrbs.get(neighbor);
    else if (neighbor.y > orb.y || neighbor.recursiveVisitedFlag) continue;
    else if (neighbor.y <= orb.y && !neighbor.recursiveVisitedFlag) {
      neighbor.recursiveVisitedFlag = true;
      const isAnchored = recurvDetectAnchored(anchoredOrbs, neighbor, orbGraph);
      anchoredOrbs.set(neighbor, isAnchored);
      return isAnchored;
    } else return false;
  }
}
