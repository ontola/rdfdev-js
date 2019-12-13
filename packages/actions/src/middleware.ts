import rdfFactory, { NamedNode } from "@ontologies/core";

import { MiddlewareActionHandler, MiddlewareFn, StoreBoundMiddleware } from "./types";

const defaultExecutableSites = typeof window !== "undefined"
  ? [rdfFactory.namedNode(new URL(window.origin))]
  : [];

/**
 * Filter to prevent superfluous unhandled middleware action from going to execActionByIRI
 *
 * Acts as a security filter as well, to prevent cross-site action injections.
 */
export const createExecFilter = (executableSites = defaultExecutableSites): MiddlewareFn => {
  return (): StoreBoundMiddleware => {
    return (next: MiddlewareActionHandler) => (iri: NamedNode, opts: any): Promise<any> => {
      if (executableSites.includes(rdfFactory.namedNode(new URL(iri.value).origin))) {
        return next(iri, opts);
      }

      return Promise.resolve();
    };
  };
};

export const loggingMiddleware = () => (next) => (a, o) => {
  // tslint:disable-next-line no-console
  console.log(`action: ${a.value}`, o);

  return next(a, o);
};
