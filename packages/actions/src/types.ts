import {
  BlankNode,
  Literal,
  NamedNode,
  Node,
  SomeTerm,
} from "@ontologies/core";

export type SerializablePrimitives = boolean | DataObject | Date | File | number | string
  | NamedNode | BlankNode | Literal;

export type SerializableDataTypes = SerializablePrimitives | SerializablePrimitives[]

export interface DataObject {
  [k: string]: SerializableDataTypes;
}

export interface ActionExecutor {
  exec(subject: Node, args?: DataObject): Promise<any>
}

export type IRIParams<T> = Record<keyof T, SomeTerm | string>;

export interface ParsedAction<ParamMap extends IRIParams<ParamMap> = {}> {
  action: Node;
  base: Node;
  params: Partial<ParamMap>;
}

export type BoundActionDispatcher<ParamMap extends IRIParams<ParamMap> = {}> =
  (action: string, payload?: Partial<ParamMap>) => Promise<any>;

export type MiddlewareActionHandler<Args = any> = (action: Node, args: Args) => Promise<any>;

export type StoreBoundMiddleware = (next: MiddlewareActionHandler) => MiddlewareActionHandler;

export type MiddlewareFn<Store = any> = (store: Store) => StoreBoundMiddleware;
