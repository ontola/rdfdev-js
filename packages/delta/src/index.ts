import rdfFactory from "@ontologies/core";
import ld from "@ontologies/ld"

export const addGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "add" : `add?graph=${encodeURIComponent(graph.value)}`);
export const replaceGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "replace" : `replace?graph=${encodeURIComponent(graph.value)}`);
export const sliceGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "slice" : `slice?graph=${encodeURIComponent(graph.value)}`);
export const purgeGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "purge" : `purge?graph=${encodeURIComponent(graph.value)}`);
export const removeGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "remove" : `remove?graph=${encodeURIComponent(graph.value)}`);
export const supplantGraph = (graph) => ld.ns(graph === rdfFactory.defaultGraph() ? "supplant" : `supplant?graph=${encodeURIComponent(graph.value)}`);

/**
 * Create a delta statement adding ({s}, {p}, {o}) to {g} or the default graph
 */
export const add = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, addGraph(g));
/**
 * Create a delta statement replacing ({s}, {p}, {o}) to {g} or the default graph
 */
export const replace = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, replaceGraph(g));
/**
 * Create a delta statement slicing ({s}, {p}, {o}) to {g} or the default graph
 */
export const slice = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, sliceGraph(g));
/**
 * Create a delta statement purging ({s}, {p}, {o}) to {g} or the default graph
 */
export const purge = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, purgeGraph(g));
/**
 * Create a delta statement removing ({s}, {p}, {o}) to {g} or the default graph
 */
export const remove = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, removeGraph(g));
/**
 * Create a delta statement supplanting ({s}, {p}, {o}) to {g} or the default graph
 */
export const supplant = (s, p, o, g = rdfFactory.defaultGraph()) => rdfFactory.quad(s, p, o, supplantGraph(g));
