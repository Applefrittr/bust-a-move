import OrbCritter from "../classes/OrbCritter";
import OrbExplosion from "../classes/OrbExplosion";
import TenPoints from "../classes/TenPoints";
import Game from "../Game";
import Bust from "../../assets/sounds/bust.mp3";
import Score from "../../assets/sounds/score.mp3";

export default function bustOrbs(game: Game) {
  if (game.orbs.bustedThisRound < 3) {
    return;
  }

  const bust = new Audio(Bust);
  bust.currentTime = 0.2;
  bust.play();
  const score = new Audio(Score);
  score.currentTime = 0.25;
  score.play();
  for (const [orb] of game.orbs.graph) {
    if (orb.busted) {
      game.score += 10;
      game.orbs.deleteOrb(orb);

      const explosion = game.pool.getFreeObject("explosions") as OrbExplosion;
      explosion.assignProps(orb.x - 2 * orb.r, orb.y - 2 * orb.r, orb.color);
      game.explosions.add(explosion);

      const critter = game.pool.getFreeObject("critters") as OrbCritter;
      critter.assignProps(orb.x, orb.y, orb.color);
      game.critters.add(critter);

      setTimeout(() => {
        const tenPoints = game.pool.getFreeObject("tens") as TenPoints;
        tenPoints.assignProps(orb.x, orb.y);
        game.tenPointSprites.add(tenPoints);
      }, 300);
      continue;
    }

    const neighbors = game.orbs.getNeighbors(orb);
    neighbors?.forEach((neighbor) => {
      if (neighbor.busted) {
        neighbors.delete(neighbor);
      }
    });
  }
}
