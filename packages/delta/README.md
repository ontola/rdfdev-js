# js.rdf.dev/delta
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/delta)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/delta)](https://npmjs.com/package/@rdfdev/delta)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/delta)](https://bundlephobia.com/result?p=@rdfdev/delta)

Utilities to quickly create [linked deltas](https://github.com/ontola/linked-delta), an rdf-native 
way to express and process changes in state.

## Example
```typescript
import rdf from "@ontologies/core";
import schema from "@ontologies/schema";
import { add, replace } from "@rdfdev/delta";
import { RDFStore } from "link-lib";

const myProfile = rdf.namedNode("https://example.com/profile/card#me");

const updateName = [
  replace(myProfile, schema.name, rdf.literal("Douglas Engelbart")),
  add(myProfile, schema.comment, rdf.literal("Update from today")),
];

new RDFStore().processDelta(updateName) // Changes applied
```

## See also
See the [js.rdf.dev documentation](https://js.rdf.dev)

## Need help with linked data?

This package is brought to you by [Ontola](https://ontola.io). We build production-grade linked data
solutions and can help you from advice to building custom web services.
