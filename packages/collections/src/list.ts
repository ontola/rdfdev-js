import rdf, { Node, Quad, SomeTerm, Term } from "@ontologies/core";
import rdfx from "@ontologies/rdf";

import { Store } from "./types";

/**
 * Convert a list from the point of {listEntry} to a Quad[].
 *
 * Will stop if missing links in the list aren't present. Can handle circular lists.
 */
export function orderedElementsOfList(store: Store, listEntry: Node): Quad[] {
  const list = [];
  const nodes = [listEntry];
  let next = listEntry;
  while (next && next !== rdfx.nil) {
    const item = store.getResourcePropertyRaw(next, rdfx.first)[0];
    if (!item) {
      break;
    }

    list.push(item);
    next = store.getResourceProperty(next, rdfx.rest);
    if (nodes.includes(next)) {
      break;
    }
    nodes.push(next);
  }

  return list;
}

/**
 * Convert a list to an array of terms
 *
 * @see {arrayToList}
 */
export function listToArray(store: Store, listEntry: Node): Term[] {
  return orderedElementsOfList(store, listEntry).map((s) => s.object);
}

/** Retrieve the first quad of the list at {listEntry} */
export function firstQuadOfList(store: Store, listEntry: Node): Quad | undefined {
  return orderedElementsOfList(store, listEntry).shift();
}

/** Retrieve the first term of the list at {listEntry} */
export function firstTermOfList(store: Store, listEntry: Node): SomeTerm | undefined {
  return firstQuadOfList(store, listEntry)?.object;
}

/** Retrieve the last quad of the list at {listEntry} */
export function lastQuadOfList(store: Store, listEntry: Node): Quad | undefined {
  return orderedElementsOfList(store, listEntry).pop();
}

/** Retrieve the last term of the list at {listEntry} */
export function lastTermOfList(store: Store, listEntry: Node): SomeTerm | undefined {
  return lastQuadOfList(store, listEntry)?.object;
}

/**
 * Convert an array of terms to a rdf:list.
 *
 * The quads are ordered, so `arrayToList()[0]?.subject` gives the list iri or undefined for an
 * empty list.
 *
 * @see {listToArray} for the inverse function.
 * @see {arrayToList}
 *
 * @param arr The array to convert.
 * @param [start] The iri of the first node in the list, defaults to a blank node.
 */
export function arrayToListQuads(arr: SomeTerm[], start?: Node): Quad[] {
  if (arr.length === 0) {
    return [];
  }

  const quads = [];
  let item = start || rdf.blankNode();
  for (let i = 0; i < arr.length; i++) {
    const next = i === arr.length - 1 ? rdfx.nil : rdf.blankNode();
    quads.push(
      rdf.quad(item, rdfx.first, arr[i]),
      rdf.quad(item, rdfx.rest, next),
    );
    item = next;
  }

  return quads;
}

/**
 * Convert an array of terms to a rdf:List.
 *
 * The quads are ordered, so `arrayToList()[0]?.subject` gives the list iri or undefined for an
 * empty list.
 *
 * @see {listToArray} for the inverse function.
 * @see {arrayToListQuads}
 *
 * @param arr The array to convert.
 * @param [start] The iri of the first node in the list, defaults to a blank node.
 * @return An array with the first element the quads and the second the IRI of the list.
 */
export function arrayToList(arr: SomeTerm[], start?: Node): [ Quad[], Node ] {
  const quads = arrayToListQuads(arr, start);

  if (quads.length === 0) {
    return [quads, rdfx.nil];
  }

  return [quads, quads[0].subject];
}
