import Game from "../Game";
import Arena from "../classes/Arena";
import OrbGraph from "../classes/OrbGraph";

function resizeArena(arena: Arena, shiftAmount: number) {
  arena.topBound = shiftAmount;
}

function shiftOrbsWithArena(orbGraph: OrbGraph, shiftAmount: number) {
  for (const [orb] of orbGraph.graph) {
    orb.y += shiftAmount;
  }
}

export default function arenaShrink(game: Game) {
  resizeArena(game.arena, game.arenaShrinkRate);
  shiftOrbsWithArena(game.orbs, game.arenaShrinkRate);
}
