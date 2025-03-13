import Orb from "../classes/Orb";
import Game from "../Game";

export default function fireCannon(game: Game) {
  if (game.loadedOrb && game.nextOrb) {
    if (game.sfx) game.audioPool.playSound("shoot");
    game.firedOrb = game.loadedOrb;
    game.loadedOrb = game.nextOrb;
    game.loadedOrb.dx = 5;
    game.firedOrb.dx = 5 * Math.cos(((-90 + game.cannon.deg) * Math.PI) / 180);
    game.firedOrb.dy = 5 * Math.sin(((-90 + game.cannon.deg) * Math.PI) / 180);
    game.orbs.addOrb(game.firedOrb);

    game.nextOrb = new Orb(
      game.cannon.x - 5 * game.orbRadius,
      game.arena.arenaFloor - game.orbRadius,
      game.orbRadius,
      0,
      0,
      game.colorRange
    );
  }
}
