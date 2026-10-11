// @ts-check
// TDD (red-green-refactor): these tests pin the redirect + base-joining
// contract BEFORE the pages depend on it. Run with `npm test`
// (node:test, zero extra dependencies).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseLocale, resolveRedirect, withBase } from "./locale.js";

describe("parseLocale", () => {
  it("accepts exact locales", () => {
    assert.equal(parseLocale("es"), "es");
    assert.equal(parseLocale("en"), "en");
  });

  it("parses BCP-47 tags by primary subtag", () => {
    assert.equal(parseLocale("es-MX"), "es");
    assert.equal(parseLocale("en_US"), "en");
    assert.equal(parseLocale("EN-gb"), "en");
  });

  it("rejects non-locales with null (never throws)", () => {
    assert.equal(parseLocale("fr"), null);
    assert.equal(parseLocale(""), null);
    assert.equal(parseLocale("   "), null);
    assert.equal(parseLocale(undefined), null);
    assert.equal(parseLocale(null), null);
    assert.equal(parseLocale(42), null);
    assert.equal(parseLocale({}), null);
  });
});

describe("resolveRedirect", () => {
  it("is total: every input yields a valid landing path", () => {
    assert.equal(resolveRedirect("es-CR"), "/es/");
    assert.equal(resolveRedirect("en-US"), "/en/");
    assert.equal(resolveRedirect("fr"), "/es/");
    assert.equal(resolveRedirect(undefined), "/es/");
  });
});

describe("withBase", () => {
  it("joins project base without double slashes", () => {
    assert.equal(
      withBase("/business-feasibility-toolkit/", "/es/"),
      "/business-feasibility-toolkit/es/",
    );
  });

  it("tolerates a base missing its trailing slash", () => {
    assert.equal(withBase("/base", "/en/"), "/base/en/");
  });

  it("keeps root base working for local dev", () => {
    assert.equal(withBase("/", "/es/"), "/es/");
  });
});
