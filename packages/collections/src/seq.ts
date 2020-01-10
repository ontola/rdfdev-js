import rdf, { NamedNode, Node, Term, Quad, SomeTerm } from "@ontologies/core";
import ld from "@ontologies/ld";
import rdfx from "@ontologies/rdf";
import rdfs from "@ontologies/rdfs";

import { Store } from "./types";

/**
 * Parses the numerical value of a rdfs:ContainerMembershipProperty predicate.
 *
 * @see https://www.w3.org/TR/rdf-schema/#ch_containermembershipproperty
 * @return The value of the predicate or -1.
 */
export function seqMemberToNumber(member: NamedNode | undefined): number {
  return Number(member?.value?.split("_")?.pop() || -1);
}

export function orderedQuadsOfSeq(store: Store, seqIRI: Node): Quad[] {
  return store
    .getResourcePropertyRaw(seqIRI, rdfs.member)
    .sort((a, b) => seqMemberToNumber(a.predicate) - seqMemberToNumber(b.predicate));
}

/**
 * Convert a sequence to an array of terms
 *
 * @see {arrayToList}
 */
export function seqToArray(store: Store, seqIRI: Node): Term[] {
  return orderedQuadsOfSeq(store, seqIRI).map((s) => s.object);
}

/** Retrieve the first quad of the list at {listIRI} */
export function firstQuadOfSeq(store: Store, seqIRI: Node): Quad | undefined {
  return orderedQuadsOfSeq(store, seqIRI).shift();
}

/** Retrieve the first term of the list at {listEntry} */
export function firstTermOfSeq(store: Store, seqIRI: Node): SomeTerm | undefined {
  return firstQuadOfSeq(store, seqIRI)?.object;
}

/** Retrieve the last quad of the list at {listIRI} */
export function lastQuadOfSeq(store: Store, seqIRI: Node): Quad | undefined {
  return orderedQuadsOfSeq(store, seqIRI).pop();
}

/** Retrieve the last term of the list at {listIRI} */
export function lastTermOfSeq(store: Store, seqIRI: Node): SomeTerm | undefined {
  return lastQuadOfSeq(store, seqIRI)?.object;
}

/**
 * Convert an array of terms to a rdf:list.
 *
 * The quads are ordered, so `arrayToList()[0]?.subject` gives the seq iri or undefined for an
 * empty seq.
 *
 * @see {seqToArray} for the inverse function.
 * @see {arrayToSeq}
 *
 * @param arr - The array to convert.
 * @param [iri] - The iri of the seq, defaults to a blank node.
 */
export function arrayToSeqQuads(arr: SomeTerm[], iri?: Node): Quad[] {
  if (arr.length === 0) {
    return [];
  }

  const seq = iri || rdf.blankNode();
  const quads = [
    rdf.quad(seq, rdfx.type, rdfx.Seq),
  ];
  for (let i = 0; i < arr.length; i++) {
    quads.push(rdf.quad(seq, rdfx.ns(`_${i}`), arr[i]));
  }

  return quads;
}

/**
 * Convert an array of terms to a rdf:Seq.
 *
 * @see {seqToArray} for the inverse function.
 * @see {arrayToSeqQuads}
 *
 * @param arr - The array to convert.
 * @param [start] - The iri of the first node in the seq, defaults to a blank node.
 * @return An array with the first element the quads and the second the IRI of the seq.
 */
export function arrayToSeq(arr: SomeTerm[], start?: Node): [ Quad[], Node ] {
  const quads = arrayToSeqQuads(arr, start);

  if (quads.length === 0) {
    return [quads, rdfx.nil];
  }

  return [quads, quads[0].subject];
}

/**
 * Creates a delta to remove the *first* element in the sequence.
 *
 * @param store - The store that contains the sequence.
 * @param seqIRI - The IRI of the sequence
 * @param method - The delta method to use, uses slice by default.
 */
export function seqShift(
  store: Store,
  seqIRI: Node,
  method: NamedNode = ld.slice,
): Quad[] {
  const firstMember = firstQuadOfSeq(store, seqIRI);

  return [
    rdf.quad(
      firstMember.subject,
      firstMember.predicate,
      firstMember.object,
      method,
    ),
  ];
}

/**
 * Creates a delta to add one or more elements to the sequence.
 *
 * @param store - The store that contains the sequence.
 * @param seqIRI - The IRI of the sequence
 * @param value - The term or terms to push. Nested arrays aren't converted to nested sequences.
 * @param method - The delta method to use, uses replace by default.
 */
export function seqPush(
  store: Store,
  seqIRI: Node,
  value: Term | Term[],
  method: NamedNode = ld.replace,
): Quad[] {
  const upperBound = Number(seqMemberToNumber(lastQuadOfSeq(store, seqIRI)?.predicate));

  return (Array.isArray(value) ? value : [value])
    .map((term, i) => rdf.quad(
        seqIRI,
        rdfx.ns(`_${upperBound + 1 + i}`),
        term,
        method,
      ));
}
