import rdf, {
  isTerm,
  NamedNode,
  Namespace,
  PlainFactory,
  SomeTerm,
} from "@ontologies/core";

import {
  ActionExecutor,
  BoundActionDispatcher,
  IRIParams,
  ParsedAction,
} from "./types";

const factory = new PlainFactory();

/**
 * Generate a path?query combination for the given {action} and {payload}.
 *
 * @see {createActionIRI}
 * @see {createActionPair}
 *
 * @param action The path of the action.
 * @param payload
 */
export function actionIRI<ParamMap extends IRIParams<ParamMap> = {}>(
  action: string,
  payload?: Partial<ParamMap>,
): string {

  const query = Object
    .entries<string | SomeTerm>(payload)
    .map<[string, string]>(([k, v]) => [
      k,
      encodeURIComponent(isTerm(v) ? factory.toNQ(v) : v),
    ]);

  return `${action}?${new URLSearchParams(query).toString()}`;
}

/**
 * Create an action generator to easy in IRI generation.
 *
 * @see {actionIRI}
 * @see {createActionPair}
 * @param base - The base Namespace to which the action/payload is added.
 */
export const createActionIRI = <ParamMap extends IRIParams<ParamMap> = {}>(base: Namespace) =>
  (action: string, payload?: Partial<ParamMap>) =>
    base(actionIRI<ParamMap>(action, payload));

/**
 * Create a action creator with the store and namespace already bound.
 *
 * @param base - The namespace to which the action name should be appended.
 * @param store - The store where the action should be dispatched.
 *
 * @see {createActionPair}
 *
 * @example
 *   const dispatch = createActionIRI(store, myNamespace);
 *   store.actions.example = {
 *     initialize: (iri: NamedNode) => dispatch('initialize', { iri })
 *   };
 */
export const createActionNS = <
  ParamMap extends IRIParams<ParamMap> = {},
  Store extends ActionExecutor = any
  >(base: Namespace, store: Store):
  BoundActionDispatcher<ParamMap> => {
  const actionNS = createActionIRI<ParamMap>(base);

  return (action, payload?: Partial<ParamMap>) => store.exec(actionNS(action, payload));
};

/**
 * Create a dispatch-parse pair for use in middleware.
 *
 * @param base - The namespace to create actions on.
 * @param store - The store to dispatch actions on.
 */
export const createActionPair = <
  ParamMap extends IRIParams<ParamMap>,
  Store extends ActionExecutor = any
  >(base: Namespace, store: Store) => ({
  dispatch: createActionNS<ParamMap>(base, store),
  parse: (action: NamedNode) => parseAction<ParamMap>(action),
});

/**
 * Parse an action for its base IRI and parameters separated.
 *
 * Only the last value of each param is included, so duplicates are omitted.
 *
 * The param values are parsed and converted for n-quads syntax, otherwise their literal value is
 * used. The resulting {return.params} is not guaranteed to be correct with the given {ParamMap}, it
 * is for typing purposes only.
 */
export const parseAction = <ParamMap extends IRIParams<ParamMap> = {}>(action: NamedNode):
  ParsedAction<ParamMap> => {

  const url = new URL(action.value);
  const params = {};
  url.searchParams.forEach((value: string, key: string) => {
    const t = decodeURIComponent(value);
    try {
      const parsedValue = rdf.termFromNQ(t);
      params[key] = parsedValue || t;
    } catch(e) {
      params[key] = t;
    }
  });

  url.search = "";

  return {
    action,
    base: rdf.namedNode(url.toString()),
    params: params as Partial<ParamMap>,
  };
};
