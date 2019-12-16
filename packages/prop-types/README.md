# js.rdf.dev/prop-types
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/prop-types)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/prop-types)](https://npmjs.com/package/@rdfdev/prop-types)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/prop-types)](https://bundlephobia.com/result?p=@rdfdev/prop-types)

React [prop-type](https://reactjs.org/docs/typechecking-with-proptypes.html) declarations for the
RDF data structures.

## Example
```typescript
import PropTypes from "prop-types";
import RDFTypes from "@rdfdev/prop-types";

const MyComponent = () => {}; // Omitted for brevity

MyComponent.propTypes = {
  // The name as an RDF Literal (e.g. xsd:string)
  name: RDFTypes.literal,
  // The IRI of the author
  author: RDFTypes.namedNode,
  // The statements/quads on their books.
  bookData: PropTypes.arrayOf(RDFTypes.quad),
  // A link to the comments, either an IRI (e.g. https) or blank (temporary document-scoped link)
  comments: RDFTypes.nodeType,
};
```

## See also
See the [js.rdf.dev documentation](https://js.rdf.dev)

## Need help with linked data?

This package is brought to you by [Ontola](https://ontola.io). We build production-grade linked data
solutions and can help you from advice to building custom web services.
