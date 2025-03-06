import Game from "../Game";

export default function shiftOrbsWithArena(game: Game) {
  for (const [orb] of game.orbs.graph) {
    orb.y += game.arenaShrinkRate;
  }
}
