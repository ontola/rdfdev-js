import rdf, { Node } from "@ontologies/core";
import * as ld from "@ontologies/ld"

const buildGraph = (graphName: string) => (graph: Node) => ld.ns(graph === rdf.defaultGraph()
  ? graphName
  : `${graphName}?graph=${encodeURIComponent(graph.value)}`);

export const addGraph = buildGraph("add");
export const replaceGraph = buildGraph("replace");
export const sliceGraph = buildGraph("slice");
export const purgeGraph = buildGraph("purge");
export const removeGraph = buildGraph("remove");
export const supplantGraph = buildGraph("supplant");

const buildQuadCreator = (graphBuilder) => (s, p, o, g = rdf.defaultGraph()) => rdf.quad(s, p, o, graphBuilder(g));

/**
 * Create a delta statement adding ({s}, {p}, {o}) to {g} or the default graph
 */
export const add = buildQuadCreator(addGraph);
/**
 * Create a delta statement replacing ({s}, {p}, {o}) to {g} or the default graph
 */
export const replace = buildQuadCreator(replaceGraph);
/**
 * Create a delta statement slicing ({s}, {p}, {o}) to {g} or the default graph
 */
export const slice = buildQuadCreator(sliceGraph);
/**
 * Create a delta statement purging ({s}, {p}, {o}) to {g} or the default graph
 */
export const purge = buildQuadCreator(purgeGraph);
/**
 * Create a delta statement removing ({s}, {p}, {o}) to {g} or the default graph
 */
export const remove = buildQuadCreator(removeGraph);
/**
 * Create a delta statement supplanting ({s}, {p}, {o}) to {g} or the default graph
 */
export const supplant = buildQuadCreator(supplantGraph);
