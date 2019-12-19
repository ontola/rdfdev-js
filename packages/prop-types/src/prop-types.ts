/**
 * PropType definitions for working with linked data prop-types.
 */

import { TermType } from "@ontologies/core";
import { oneOf, oneOfType, shape, string } from "prop-types";

/** Validate if the prop is a valid BlankNode. */
export const blankNode = shape({
  termType: oneOf([TermType.BlankNode]).isRequired,
  value: string.isRequired,
});

/** Validate if the prop is a valid NamedNode. */
export const namedNode = shape({
  termType: oneOf([TermType.NamedNode]).isRequired,
  value: string.isRequired,
});

/** Validate if the prop is a valid Literal. */
export const literal = shape({
  termType: oneOf([TermType.Literal]).isRequired,
  value: string.isRequired,

  datatype: namedNode,
  language: string.isRequired,
});

/** Validate if the prop is a valid node (blank or named). */
export const nodeType = oneOfType([blankNode, namedNode]);

/** Validate if the prop is a valid term (blank node, named node, or literal). */
export const termType = oneOfType([blankNode, namedNode, literal]);

/** Validate if the prop is a valid Quad. */
export const quad = shape({
  subject: oneOfType([ blankNode, namedNode ]).isRequired,

  predicate: namedNode.isRequired,

  object: oneOfType([ blankNode, namedNode, literal ]).isRequired,

  graph: oneOfType([ blankNode, namedNode ]),
});
