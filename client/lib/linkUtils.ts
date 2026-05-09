import type { SiteSettings } from "@site/contexts/SiteSettingsContext";

const ROUTE_ALIASES: Record<string, string> = {
  "/contact": "/kontakt/",
  "/contact/": "/kontakt/",
  "/about": "/o-nama/",
  "/about/": "/o-nama/",
  "/practice-areas": "/usluge/",
  "/practice-areas/": "/usluge/",
};

const LABEL_ALIASES: Record<string, string> = {
  pocetna: "/",
  home: "/",
  kontakt: "/kontakt/",
  'kontaktirajte nas': "/kontakt/",
  'o nama': "/o-nama/",
  about: "/o-nama/",
  usluge: "/usluge/",
  services: "/usluge/",
};

function normalizeLabel(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function slugifyLabel(value: string) {
  const normalized = normalizeLabel(value).replace(/\s+/g, "-");
  return normalized ? `/${normalized}/` : "/";
}

export function normalizeInternalRoute(value: string) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === "/") {
    return "/";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const withoutHashOrQuery = withLeadingSlash.split(/[?#]/)[0];
  const aliased = ROUTE_ALIASES[withoutHashOrQuery] || ROUTE_ALIASES[`${withoutHashOrQuery}/`] || withLeadingSlash;

  if (aliased === "/") {
    return "/";
  }

  return aliased.endsWith("/") ? aliased : `${aliased}/`;
}

export function normalizeHref(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  const withoutProtocol = trimmed.replace(/^https?:\/\/(tel:|mailto:)/i, "$1");

  if (/^(tel:|mailto:|#)/i.test(withoutProtocol)) {
    return withoutProtocol;
  }

  if (/^[^\s@/]+@[^\s@]+\.[^\s@]+$/.test(withoutProtocol)) {
    return `mailto:${withoutProtocol}`;
  }

  if (/^\+?[\d\s().-]{6,}$/.test(withoutProtocol)) {
    return `tel:${withoutProtocol.replace(/\D/g, "")}`;
  }

  if (/^(https?:|\/\/)/i.test(withoutProtocol)) {
    return withoutProtocol;
  }

  if (withoutProtocol.startsWith("/")) {
    return normalizeInternalRoute(withoutProtocol);
  }

  return slugifyLabel(withoutProtocol);
}

export function isExternalHref(value: string) {
  return /^(https?:|mailto:|tel:|#)/i.test(value);
}

export function resolveFooterHref(
  label: string,
  href: string | undefined,
  settings: SiteSettings,
) {
  const normalizedHref = normalizeHref(href);
  if (normalizedHref) {
    return normalizedHref;
  }

  const normalizedLabel = normalizeLabel(label);
  const navigationMatch = settings.navigationItems.find(
    (item) => normalizeLabel(item.label) === normalizedLabel,
  );

  if (navigationMatch?.href) {
    return normalizeHref(navigationMatch.href);
  }

  const aliasMatch = LABEL_ALIASES[normalizedLabel];
  if (aliasMatch) {
    return aliasMatch;
  }

  return slugifyLabel(label);
}

export function normalizeHtmlHrefs(html: string | null | undefined) {
  if (!html) {
    return "";
  }

  return html.replace(/href=(['"])(.*?)\1/gi, (_match, quote: string, href: string) => {
    const normalized = normalizeHref(href);
    return `href=${quote}${normalized || href}${quote}`;
  });
}
