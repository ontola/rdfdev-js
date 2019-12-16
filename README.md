# js.rdf.dev
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/)
[![Maintainability](https://api.codeclimate.com/v1/badges/292914da43d93b43addd/maintainability)](https://codeclimate.com/github/ontola/rdfdev-js/maintainability)

Collection of libraries to ease in JavaScript RDF development.

## Packages
### IRI
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/iri)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/iri)](https://npmjs.com/package/@rdfdev/iri)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/iri)](https://bundlephobia.com/result?p=@rdfdev/iri)

A lot of IRI/URI manipulation can happen while working with linked data, this package provides 
utility functions to do just that.

### Actions
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/actions)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/actions)](https://npmjs.com/package/@rdfdev/actions)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/actions)](https://bundlephobia.com/result?p=@rdfdev/actions)

Utilities for working with [link actions](https://github.com/fletcher91/link-lib/wiki/Hypermedia-API)
and link middleware.

### Collections
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/collections)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/collections)](https://npmjs.com/package/@rdfdev/collections)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/collections)](https://bundlephobia.com/result?p=@rdfdev/collections)

Utilities for working with different kinds of RDF collections (rdf:Seq, rdf:List)

### Delta
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/delta)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/delta)](https://npmjs.com/package/@rdfdev/delta)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/delta)](https://bundlephobia.com/result?p=@rdfdev/delta)

Utilities to quickly create [linked deltas](https://github.com/ontola/linked-delta), an rdf-native 
way to express and process changes in state.

### Prop types
[![Read the Docs](https://img.shields.io/readthedocs/pip.svg)](https://js.rdf.dev/prop-types)
[![npm (tag)](https://img.shields.io/npm/v/@rdfdev/prop-types)](https://npmjs.com/package/@rdfdev/prop-types)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@rdfdev/prop-types)](https://bundlephobia.com/result?p=@rdfdev/prop-types)

React [prop-type](https://reactjs.org/docs/typechecking-with-proptypes.html) declarations for the
RDF data structures.

## See also
The following libraries are used by these packages. 
### @ontologies/core
[![GitHub stars](https://img.shields.io/github/stars/ontola/ontologies?style=social)](https://github.com/ontola/ontologies)
[![npm (tag)](https://img.shields.io/npm/v/@ontologies/core/next?label=npm)](https://npmjs.com/package/@ontologies/core)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@ontologies/core@next)

Makes working with RDF a breeze:
* Types for RDF including quads, literals, resources.
* A data factory for creating RDF data. 
* Access a run-time set datafactory in static context!
* Typeguards to check if something is an RDF object.

### Link lib

[![GitHub stars](https://img.shields.io/github/stars/fletcher91/link-lib?style=social)](https://github.com/fletcher91/link-lib) 
[![npm (tag)](https://img.shields.io/npm/v/link-lib/light?label=npm)](https://npmjs.com/package/link-lib)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/link-lib@light)
![CircleCI](https://img.shields.io/circleci/build/gh/fletcher91/link-lib/use-data-factory-and-ontologies)
[![Maintainability](https://api.codeclimate.com/v1/badges/e8824bb0fb4bcf689749/maintainability)](https://codeclimate.com/github/fletcher91/link-lib/maintainability)

Fetch, store, write and render linked data.

### Link redux
[![GitHub stars](https://img.shields.io/github/stars/fletcher91/link-redux?style=social)](https://github.com/fletcher91/link-redux) 
[![npm (tag)](https://img.shields.io/npm/v/link-redux/light?label=npm)](https://npmjs.com/package/link-redux)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/link-redux@light)
![CircleCI](https://img.shields.io/circleci/build/gh/fletcher91/link-redux/datafactory)
[![Maintainability](https://api.codeclimate.com/v1/badges/6801255f84f20aa73420/maintainability)](https://codeclimate.com/github/fletcher91/link-redux/maintainability)

All the tools needed to quickly create interactive web apps consuming RDF.


## Need help with linked data?

All these package are brought to you by [Ontola](https://ontola.io), we build production-grade
linked data solutions and can help you from advice to building custom web services.
