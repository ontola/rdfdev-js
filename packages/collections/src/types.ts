import { Node, Quad, Term } from "@ontologies/core";

export interface Store {
  addQuads(data: Quad[]): Quad[];
  getResourceProperty<T extends Term = Term>(
    subject: Node,
    property: Node | Node[],
  ): T | undefined
  getResourcePropertyRaw(subject: Node, property: Node | Node[]): Quad[]
}
