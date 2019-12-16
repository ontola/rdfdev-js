# js.rdf.dev/collections
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/collections)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/collections)](https://npmjs.com/package/@rdfdev/collections)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/collections)](https://bundlephobia.com/result?p=@rdfdev/collections)

Utilities for working with different kinds of RDF collections (rdf:Seq, rdf:List)

## Example
```typescript
import rdf from "@ontologies/core";
import { seqPush } from "@rdfdev/collections"; 


const seqIRI = rdf.namedNode("https://example.com/mySequence");
seqPush(store, seqIRI, rdf.literal("added value"));
```

## See also
See the [js.rdf.dev documentation](https://js.rdf.dev)

## Need help with linked data?

This package is brought to you by [Ontola](https://ontola.io). We build production-grade linked data
solutions and can help you from advice to building custom web services.
