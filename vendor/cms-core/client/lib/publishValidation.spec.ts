import { describe, expect, it } from "vitest";
import type { Page, Post } from "./database.types";
import { validatePageForPublish, validatePostForPublish } from "./publishValidation";

const page: Page = {
  id: "page-id",
  title: "O nama",
  url_path: "/o-nama/",
  page_type: "standard",
  content: {
    hero: {
      headline: "Digitalna rešenja za održiv rast poslovanja",
      description: "Polaris pomaže kompanijama kroz izradu sajtova, SEO optimizaciju i digitalni marketing usmeren na merljive rezultate.",
    },
  },
  meta_title: "O nama | Polaris Development",
  meta_description: "Upoznajte Polaris Development, naš pristup radu i digitalne usluge za rast poslovanja.",
  canonical_url: null,
  og_title: null,
  og_description: null,
  og_image: null,
  noindex: false,
  schema_type: null,
  schema_data: null,
  status: "published",
  published_at: null,
  updated_at: "2026-01-01T00:00:00Z",
  created_at: "2026-01-01T00:00:00Z",
};

const post: Post = {
  id: "post-id",
  title: "SEO vodič",
  slug: "seo-vodic",
  excerpt: null,
  featured_image: null,
  category_id: null,
  content: [],
  body: "<p>Ovo je dovoljno detaljan sadržaj članka koji objašnjava SEO proces, tehničke korake, sadržaj i merenje rezultata za poslovni sajt u Srbiji.</p>",
  meta_title: "SEO vodič za poslovne sajtove",
  meta_description: "Praktičan vodič kroz tehnički SEO, sadržaj, interne linkove i merenje rezultata poslovnog sajta.",
  canonical_url: null,
  og_title: null,
  og_description: null,
  og_image: null,
  noindex: false,
  status: "published",
  published_at: null,
  updated_at: "2026-01-01T00:00:00Z",
  created_at: "2026-01-01T00:00:00Z",
};

describe("publish validation", () => {
  it("accepts complete CMS pages and posts", () => {
    expect(validatePageForPublish(page)).toEqual([]);
    expect(validatePostForPublish(post)).toEqual([]);
  });

  it("rejects missing SEO metadata", () => {
    expect(validatePageForPublish({ ...page, meta_description: "" })).toContain("Meta opis je obavezan.");
    expect(validatePostForPublish({ ...post, meta_title: null })).toContain("SEO naslov je obavezan.");
  });

  it("rejects placeholder content", () => {
    expect(validatePageForPublish({ ...page, content: { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit and more placeholder copy." } })).toContain("Uklonite placeholder sadržaj pre objave.");
    expect(validatePostForPublish({ ...post, body: `${post.body} Lorem ipsum` })).toContain("Uklonite placeholder sadržaj pre objave.");
  });

  it("rejects invalid canonical URLs", () => {
    expect(validatePageForPublish({ ...page, canonical_url: "/o-nama/" })).toContain("Canonical URL nije validan apsolutni URL.");
    expect(validatePostForPublish({ ...post, canonical_url: "http://example.com/post/" })).toContain("Canonical URL mora koristiti HTTPS.");
  });
});
