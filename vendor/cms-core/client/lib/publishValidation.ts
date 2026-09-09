import type { Page, Post } from "./database.types";

const placeholderPatterns = [
  /lorem ipsum/i,
  /your firm headline/i,
  /this is an example faq/i,
  /page headline/i,
  /enter a description here/i,
];

function validateCommon(record: {
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
}) {
  const errors: string[] = [];

  if (!record.title.trim()) errors.push("Naslov je obavezan.");
  if (!record.meta_title?.trim()) errors.push("SEO naslov je obavezan.");
  if (!record.meta_description?.trim()) errors.push("Meta opis je obavezan.");

  if (record.canonical_url?.trim()) {
    try {
      const canonical = new URL(record.canonical_url);
      if (canonical.protocol !== "https:") {
        errors.push("Canonical URL mora koristiti HTTPS.");
      }
    } catch {
      errors.push("Canonical URL nije validan apsolutni URL.");
    }
  }

  return errors;
}

function containsPlaceholder(value: unknown) {
  const serialized = JSON.stringify(value ?? "");
  return placeholderPatterns.some((pattern) => pattern.test(serialized));
}

function hasMeaningfulText(value: unknown, minimumLength: number) {
  const plainText = JSON.stringify(value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/[{}\[\]",:]/g, " ")
    .replace(/\\[nrt]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return plainText.length >= minimumLength;
}

export function validatePageForPublish(page: Page) {
  const errors = validateCommon(page);

  if (!page.url_path.trim()) errors.push("URL putanja je obavezna.");
  if (!hasMeaningfulText(page.content, 80)) {
    errors.push("Stranica mora imati sadržaj pre objave.");
  }
  if (containsPlaceholder(page.content)) {
    errors.push("Uklonite placeholder sadržaj pre objave.");
  }

  return errors;
}

export function validatePostForPublish(post: Post) {
  const errors = validateCommon(post);

  if (!post.slug.trim()) errors.push("Slug je obavezan.");
  if (!hasMeaningfulText(post.body, 100)) {
    errors.push("Članak mora imati sadržaj pre objave.");
  }
  if (containsPlaceholder(post.body)) {
    errors.push("Uklonite placeholder sadržaj pre objave.");
  }

  return errors;
}

export function formatPublishErrors(errors: string[]) {
  return errors.join(" ");
}
