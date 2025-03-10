import Game from "../Game";

export default function updateCannonAmmo(game: Game) {
  if (game.nextOrb && game.loadedOrb) {
    game.nextOrb.update(game.ctx, game);
    game.loadedOrb.update(game.ctx, game);

    if (game.loadedOrb.x >= game.cannon.x + game.cannon.width / 2) {
      game.loadedOrb.x = game.cannon.x + game.cannon.width / 2;
      game.loadedOrb.dx = 0;
      game.loadedOrb.y = game.cannon.y + game.cannon.height / 2;
    }
  }
}
