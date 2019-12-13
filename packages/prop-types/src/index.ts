/**
 * PropType definitions for working with linked data prop-types.
 */

import { TermType } from "@ontologies/core";
import { oneOf, oneOfType, shape, string } from "prop-types";

/** Validate if the prop is a valid BlankNode. */
export const blankNodeShape = shape({
  termType: oneOf([TermType.BlankNode]).isRequired,
  value: string.isRequired,
});

/** Validate if the prop is a valid NamedNode. */
export const namedNodeShape = shape({
  termType: oneOf([TermType.NamedNode]).isRequired,
  value: string.isRequired,
});

/** Validate if the prop is a valid Literal. */
export const literalShape = shape({
  termType: oneOf([TermType.Literal]).isRequired,
  value: string.isRequired,

  datatype: namedNodeShape,
  language: string.isRequired,
});

/** Validate if the prop is a valid node (blank or named). */
export const nodeType = oneOfType([blankNodeShape, namedNodeShape]);

/** Validate if the prop is a valid term (blank node, named node, or literal). */
export const termType = oneOfType([blankNodeShape, namedNodeShape, literalShape]);

/** Validate if the prop is a valid Quad. */
export const quadShape = shape({
  subject: oneOfType([ blankNodeShape, namedNodeShape ]).isRequired,

  predicate: namedNodeShape.isRequired,

  object: oneOfType([ blankNodeShape, namedNodeShape, literalShape ]).isRequired,

  graph: oneOfType([ blankNodeShape, namedNodeShape ]),
});
