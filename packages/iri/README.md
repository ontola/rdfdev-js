# js.rdf.dev/iri
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/iri)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/iri)](https://npmjs.com/package/@rdfdev/iri)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/iri)](https://bundlephobia.com/result?p=@rdfdev/iri)

A lot of IRI/URI manipulation can happen while working with linked data, this package provides 
utility functions to do just that.

## Example
```typescript
import rdf from "@ontologies/core";
import { doc, filename, origin, parentDir, site, term } from "@rdfdev/iri";

const myIRI = rdf.namedNode("https://example.com/people/1#profilePicture");

doc(myIRI)           // rdf.namedNode("https://example.com/people/1")
filename(myIRI)      // "1"
parentDir(myIRI)     // rdf.namedNode("https://example.com/people")

origin(myIRI)        // rdf.namedNode("https://example.com")
site(myIRI)          // rdf.namedNode("https://example.com/")

term(myIRI)        // "profilePicture"
```

## See also
See the [js.rdf.dev documentation](https://js.rdf.dev)

## Need help with linked data?

This package is brought to you by [Ontola](https://ontola.io). We build production-grade linked data
solutions and can help you from advice to building custom web services.
