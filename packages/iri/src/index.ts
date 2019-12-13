import rdfFactory, { NamedNode } from "@ontologies/core";

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
  return rdfFactory.namedNode(docStr(iri.value));
}

/**
 * Get the filename (with extension) from an IRI.
 *
 * @param iri - The IRI to get the filename from.
 * @param folder - The base folder to trim. Will be guessed if omitted.
 * @returns The filename with extension or an empty string if it has no filename.
 */
export function filenameStr(iri: string, folder?: string): string {
  if (typeof folder === "undefined") {
    const url = new URL(iri);
    folder = `${url.origin}${url.pathname.split("/").slice(0, -1).join("/")}`;
  }
  let file = iri.replace(folder, "");
  // There is some issue in redirection or parsing where paths without trailing slash will cause
  // the embedded files to be root-relative IRI's.
  if (file.includes("://")) {
    file = iri.replace(siteStr(folder), "");
  }

  return file;
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
  return rdfFactory.namedNode(originStr(iri.value));
}

/**
 * Get the IRI of the directory containing {iri} or its parent if {iri} has a trailing slash.
 */
export function parentDirStr(iri: string): string {
  const url = new URL(iri);
  const endIndex = url.pathname.endsWith("/") ? -2 : -1;
  url.pathname = url.pathname.split("/").slice(0, endIndex).join("/");

  return url.toString();
}

/**
 * Get the IRI of the directory containing {iri} or its parent if {iri} has a trailing slash.
 */
export function parentDir(iri: NamedNode): NamedNode {
  return rdfFactory.namedNode(parentDirStr(iri.value));
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
  return rdfFactory.namedNode(siteStr(iri.value));
}
