import { Node, Quadruple, Term } from "@ontologies/core";

export interface Store {
  getResourceProperty<T extends Term = Term>(
    subject: Node,
    property: Node | Node[],
  ): T | undefined
  getResourcePropertyRaw(subject: Node, property: Node | Node[]): Quadruple[]
}
