# js.rdf.dev/collections
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/collections)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/collections)](https://npmjs.com/package/@rdfdev/collections)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/collections)](https://bundlephobia.com/result?p=@rdfdev/collections)

Utilities for reading and manipulating different kinds of RDF collections (rdf:Seq, rdf:List)

## Example
```typescript
import rdf from "@ontologies/core";
import { arrayToList, arrayToSeq, firstTermOfList, lastTermOfList, firstTermOfSeq, lastTermOfSeq, listToArray, seqToArray, Store } from "@rdfdev/collections";

const myArray = ["one", 2, rdf.namedNode("https://three.example/")];
const myStore: Store; // This can be the LinkedRenderStore from link-lib or your own.

// Converting an array to an rdf Sequence
const [ seqData, seqIRI ] =  arrayToSeq(myArray);
myStore.addQuads(seqData);
/**
 * The `seqData` would contain the following quads;
 * <seqIRI> a rdf:Seq .
 *      rdf:_0 "one" .
 *      rdf:_1 "2"^^http://www.w3.org/2001/XMLSchema#number .
 *      rdf:_2 <https://three.example/> ;
 */

// Reading
seqToArray(seqIRI); // [rdf.literal("one"), rdf.literal(2), rdf.namedNode("https://three.example/")]
firstTermOfSeq(myStore, listIRI); // rdf.literal("one")
lastTermOfSeq(myStore, listIRI); // rdf.namedNode("https://three.example/")

const [ listData, listIRI ] = arrayToList(myArray);
myStore.addQuads(listData);
/**
 * The `seqData` would contain the following quads;
 * <listIRI> rdf:first "one" .
 * <listIRI> rdf:rest _:0 .
 * _:0 rdf:first "2"^^http://www.w3.org/2001/XMLSchema#number .
 * _:0 rdf:rest _:1 .
 * _:1 rdf:first <https://three.example/> ;
 * _:1 rdf:rest rdf:nil ;
 */

// Reading
listToArray(listIRI); // [rdf.literal("one"), rdf.literal(2), rdf.namedNode("https://three.example/")]
firstTermOfList(myStore, listIRI); // rdf.literal("one")
lastTermOfList(myStore, listIRI); // rdf.namedNode("https://three.example/")

```

## Getting started

Just install the package and its peer dependencies.

`npm i @rdfdev/collections @ontologies/core @ontologies/ld @ontologies/rdf @ontologies/rdfs`

`yarn add @rdfdev/collections @ontologies/core @ontologies/ld @ontologies/rdf @ontologies/rdfs`

## Documentation

See the [js.rdf.dev/collections documentation](https://js.rdf.dev/collections)

See the complete [js.rdf.dev documentation](https://js.rdf.dev)

## Need help with linked data?

This package is brought to you by [Ontola](https://ontola.io). We build production-grade linked data
solutions and can help you from advice to building custom web services.
