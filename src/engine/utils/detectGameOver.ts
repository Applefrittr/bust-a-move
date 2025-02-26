import Game from "../Game";

export default function detectGameOver(game: Game) {
  for (const [orb] of game.orbs.graph) {
    if (orb === game.firedOrb) continue;
    if (game.arena.bottomBound - orb.y < orb.r) return true;
  }
  return false;
}
