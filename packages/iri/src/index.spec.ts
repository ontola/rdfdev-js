import "jest";

import rdf from "@ontologies/core";
import "jest";

import { doc, filename, filenameStr, origin, parentDir, site, term } from "./index";

const root = rdf.namedNode("http://example.com/");
const rootSlashless = rdf.namedNode("http://example.com");
const base = rdf.namedNode("http://example.com/page");
const frag = rdf.namedNode("http://example.com/page#test");
const nested1 = rdf.namedNode("http://example.com/page/sub");
const nested1Trailing = rdf.namedNode("http://example.com/page/sub/");
const nested2 = rdf.namedNode("http://example.com/page/sub/resource");
const nested2Ext = rdf.namedNode("http://example.com/page/sub/resource.html");
const nested2query = rdf.namedNode("http://example.com/page/sub/resource?test=true");

describe("iri", () => {
    it("has correct readme examples", () => {
        const myIRI = rdf.namedNode("https://example.com/people/1#profilePicture");

        expect(doc(myIRI)).toEqual(rdf.namedNode("https://example.com/people/1"));
        expect(filename(myIRI)).toEqual("1");
        expect(parentDir(myIRI)).toEqual(rdf.namedNode("https://example.com/people"));

        expect(origin(myIRI)).toEqual(rdf.namedNode("https://example.com"));
        expect(site(myIRI)).toEqual(rdf.namedNode("https://example.com/"));

        expect(term(myIRI)).toEqual("profilePicture");
    });

    describe("doc", () => {
        it("keeps document iris", () => {
            expect(doc(base)).toEqual(base);
        });

        it("removes the fragment", () => {
            expect(doc(frag)).toEqual(base);
        });
    });

    describe("filename", () => {
        it("handles nested resource", () => {
            expect(filename(nested2Ext)).toEqual("resource.html");
        });

        it("handles nested resource with custom folder", () => {
            expect(filename(nested2Ext, nested1Trailing)).toEqual("resource.html");
        });

        it("handles nested resource with relative folder", () => {
            expect(filenameStr(nested2Ext.value, "/page/sub/")).toEqual("resource.html");
        });

        it("handles nested resource with custom folder multiple levels", () => {
            expect(filename(nested2Ext, base)).toEqual("/sub/resource.html");
        });

        it("handles nested resource from root", () => {
            expect(filename(nested2Ext, root)).toEqual("page/sub/resource.html");
        });

        it("handles absolute iris", () => {
            expect(filenameStr("/page/sub/resource.spec.js")).toEqual("resource.spec.js");
        });
    });

    describe("origin", () => {
        it("trims the fragment", () => {
            expect(origin(frag)).toEqual(rootSlashless);
        });

        it("trims the path", () => {
            expect(origin(nested1Trailing)).toEqual(rootSlashless);
        });

        it("preserves origins", () => {
            expect(origin(rootSlashless)).toEqual(rootSlashless);
        });

        it("trims the trailing slash", () => {
            expect(origin(root)).toEqual(rootSlashless);
        });
    });

    describe("parentDir", () => {
        it("resolves to subdir", () => {
            expect(parentDir(nested2)).toEqual(nested1);
        });

        it("resolves to base", () => {
            expect(parentDir(nested1)).toEqual(base);
        });

        it("resolves to base with trailing slash", () => {
            expect(parentDir(nested1Trailing)).toEqual(base);
        });

        it("resolves to base removing fragments", () => {
            expect(parentDir(frag)).toEqual(root);
        });

        it("removes query parameters", () => {
            expect(parentDir(nested2query)).toEqual(nested1);
        });
    });

    describe("site", () => {
        it("trims the fragment", () => {
            expect(site(frag)).toEqual(root);
        });

        it("trims the path", () => {
            expect(site(nested1Trailing)).toEqual(root);
        });

        it("preserves sites", () => {
            expect(site(rootSlashless)).toEqual(root);
        });

        it("trims the trailing slash", () => {
            expect(site(root)).toEqual(root);
        });
    });

    describe("term", () => {
        it("root", () => { expect(term(root)).toEqual("") });
        it("rootSlashless", () => { expect(term(rootSlashless)).toEqual("example.com") });
        it("base", () => { expect(term(base)).toEqual("page") });
        it("frag", () => { expect(term(frag)).toEqual("test") });
        it("nested1", () => { expect(term(nested1)).toEqual("sub") });
        it("nested1Trailing", () => { expect(term(nested1Trailing)).toEqual("") });
        it("nested2", () => { expect(term(nested2)).toEqual("resource") });
        it("nested2query", () => { expect(term(nested2query)).toEqual("resource") });
    });
});
