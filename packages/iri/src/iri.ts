import rdf, { NamedNode } from "@ontologies/core";

/**
 * Transforms the {iri} to match what a browser would fetch for that IRI.
 *
 * Effectively the IRI without the fragment (#).
 */
export function docStr(iri: string): string {
  const url = new URL(iri);
  url.hash = "";

  return url.toString()
}

/**
 * Transforms the {iri} to match what a browser would fetch for that IRI.
 *
 * Effectively the IRI without the fragment (#).
 */
export function doc(iri: NamedNode): NamedNode {
  return rdf.namedNode(docStr(iri.value));
}

/**
 * Get the filename (with extension) from an IRI.
 *
 * @param iri - The IRI to get the filename from.
 * @param folder - The base folder to trim. Will be guessed if omitted.
 * @returns The filename with extension or an empty string if it has no filename.
 */
export function filenameStr(iri: string, folder?: string): string {
  const fqIRI = new URL(iri, "http://example.com");
  fqIRI.hash = "";
  const absoluteIRI = fqIRI.toString().replace(originStr(fqIRI.toString()), "");
  if (folder) {
    folder = folder.replace(new URL(folder, "http://example.com").origin, "");
  }
  const replace = folder || `${new URL(absoluteIRI, "http://example.com").pathname.split("/").slice(0, -1).join("/")}/`
  const file = absoluteIRI.replace(replace,"");

  return file.includes("://") ? file.replace(siteStr(file), "") : file;
}

/**
 * Get the filename (with extension) from an IRI.
 *
 * @param iri - The IRI to get the filename from.
 * @param folder - The base folder to trim. Will be guessed if omitted.
 * @returns The filename with extension or an empty string if it has no filename.
 */
export function filename(iri: NamedNode, folder?: NamedNode): string {
  return filenameStr(iri.value, folder?.value);
}

/**
 * Get the origin of the {iri} without trailing slash
 */
export function originStr(iri: string): string {
  return new URL(iri).origin;
}

/**
 * Get the origin of the {iri} without trailing slash
 */
export function origin(iri: NamedNode): NamedNode {
  return rdf.namedNode(originStr(iri.value));
}

/**
 * Get the IRI of the directory containing {iri} or its parent if {iri} has a trailing slash.
 */
export function parentDirStr(iri: string): string {
  const url = new URL(iri);
  const endIndex = url.pathname.endsWith("/") ? -2 : -1;
  url.pathname = url.pathname.split("/").slice(0, endIndex).join("/");
  url.hash = "";
  url.search = "";

  return url.toString();
}

/**
 * Get the IRI of the directory containing {iri} or its parent if {iri} has a trailing slash.
 */
export function parentDir(iri: NamedNode): NamedNode {
  return rdf.namedNode(parentDirStr(iri.value));
}

/**
 * Get the origin of the {iri} with trailing slash
 */
export function siteStr(iri: string): string {
  return `${originStr(iri)}/`;
}

/**
 * Get the origin of the {iri} with trailing slash
 */
export function site(iri: NamedNode): NamedNode {
  return rdf.namedNode(siteStr(iri.value));
}

/**
 * Get a term name for this {iri}.
 * This guesses a term name using either the fragment or a path segment. Has no preconception of
 * well-known ontologies.
 */
export function termStr(iri: string): string {
  return iri.split(/[\/#]/).pop()!.split("?").shift() || "";
}

/**
 * Get a term name for this {iri}.
 * This guesses a term name using either the fragment or a path segment. Has no preconception of
 * well-known ontologies.
 */
export function term(iri: NamedNode): string {
  return termStr(iri.value);
}
