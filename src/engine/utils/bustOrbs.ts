import OrbCritter from "../classes/OrbCritter";
import OrbExplosion from "../classes/OrbExplosion";
// import OrbGraph from "../classes/OrbGraph";
import TenPoints from "../classes/TenPoints";
import Game from "../Game";

export default function bustOrbs(game: Game) {
  if (game.orbs.bustedThisRound < 3) {
    return;
  }

  for (const [orb] of game.orbs.graph) {
    if (orb.busted) {
      game.orbs.deleteOrb(orb);
      const explosion = new OrbExplosion(
        orb.x - 2 * orb.r,
        orb.y - 2 * orb.r,
        orb.color,
        game.orbToSpriteRatio
      );
      const critter = new OrbCritter(
        orb.x,
        orb.y,
        orb.color,
        game.orbToSpriteRatio
      );
      game.critters.add(critter);
      game.explosions.add(explosion);
      setTimeout(() => {
        const tenPoints = new TenPoints(orb.x, orb.y, game.orbToSpriteRatio);
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
