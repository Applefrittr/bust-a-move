import Orb from "../objects/Orb";
import Game from "../Game";

export default function fireCannon(game: Game, loaded: Orb, next: Orb) {
  game.firedOrb = loaded;
  game.loadedOrb = next;
  game.loadedOrb.dx = 5;
  game.firedOrb.dx = 10 * Math.cos(((-90 + game.cannon.deg) * Math.PI) / 180);
  game.firedOrb.dy = 10 * Math.sin(((-90 + game.cannon.deg) * Math.PI) / 180);
  game.orbs.addOrb(game.firedOrb);
  game.nextOrb = new Orb(
    game.cannon.x - (6 * game.cannon.width) / 2,
    game.cannon.y + game.cannon.height / 2,
    game.orbRadius,
    0,
    0
  );
}
