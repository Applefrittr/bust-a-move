import Orb from "./Orb";

export default class OrbGraph {
  graph: Map<Orb, Set<Orb>>;

  constructor() {
    this.graph = new Map<Orb, Set<Orb>>();
  }

  addOrb(orb: Orb) {
    this.graph.set(orb, new Set<Orb>());
  }

  addEdge(orb1: Orb, orb2: Orb) {
    this.graph.get(orb1)?.add(orb2);
    this.graph.get(orb2)?.add(orb1);
  }

  getNeighbors(orb: Orb) {
    return this.graph.get(orb);
  }

  hasEdge(orb1: Orb, orb2: Orb) {
    return this.graph.get(orb1)?.has(orb2);
  }
}
