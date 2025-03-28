import OrbGraph from "../classes/OrbGraph";

export default function resetBustStatus(orbGraph: OrbGraph) {
  orbGraph.bustedThisRound = 0;
  for (const [orb] of orbGraph.graph) {
    orb.busted = false;
  }
}
