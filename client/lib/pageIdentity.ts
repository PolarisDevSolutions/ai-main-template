export type StructuredPageKind =
  | "home"
  | "about"
  | "contact"
  | "practice-areas"
  | "practice-area";

const STRUCTURED_PAGE_ALIASES = {
  home: ["/"],
  about: ["/about/", "/o-nama/"],
  contact: ["/contact/", "/kontakt/"],
  "practice-areas": ["/practice-areas/", "/usluge/"],
} as const satisfies Record<Exclude<StructuredPageKind, "practice-area">, string[]>;

const ALIAS_LOOKUP = Object.entries(STRUCTURED_PAGE_ALIASES).reduce<Record<string, string[]>>(
  (lookup, [, aliases]) => {
    const normalizedAliases = aliases.map((alias) => normalizePagePath(alias));

    for (const alias of normalizedAliases) {
      lookup[alias] = normalizedAliases;
    }

    return lookup;
  },
  {},
);

const KIND_LOOKUP = Object.entries(STRUCTURED_PAGE_ALIASES).reduce<
  Record<string, Exclude<StructuredPageKind, "practice-area">>
>((lookup, [kind, aliases]) => {
  for (const alias of aliases) {
    lookup[normalizePagePath(alias)] = kind as Exclude<StructuredPageKind, "practice-area">;
  }

  return lookup;
}, {});

export function normalizePagePath(path: string | null | undefined) {
  if (!path || path === "/") {
    return "/";
  }

  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}

export function resolveStructuredPageKind(page: {
  url_path?: string | null;
  page_type?: string | null;
}) {
  const normalizedPath = normalizePagePath(page.url_path);

  const directKind = KIND_LOOKUP[normalizedPath];

  if (directKind) {
    return directKind;
  }

  if (
    page.page_type === "practice" ||
    normalizedPath.startsWith("/practice-areas/")
  ) {
    return "practice-area" satisfies StructuredPageKind;
  }

  return null;
}

export function getEquivalentStructuredPaths(path: string) {
  const normalizedPath = normalizePagePath(path);
  return ALIAS_LOOKUP[normalizedPath] ?? [normalizedPath];
}

export function buildPublishedPageLookupQuery(urlPaths: string[], select: string) {
  const normalizedPaths = Array.from(
    new Set(urlPaths.map((path) => normalizePagePath(path))),
  );
  const params = new URLSearchParams({
    status: "eq.published",
    select,
  });

  if (normalizedPaths.length === 1) {
    params.set("url_path", `eq.${normalizedPaths[0]}`);
  } else {
    params.set(
      "or",
      `(${normalizedPaths.map((path) => `url_path.eq.${path}`).join(",")})`,
    );
  }

  return params.toString();
}

export function pickPreferredPageRecord<T extends { url_path?: string | null }>(
  records: T[],
  preferredPaths: string[],
) {
  const normalizedPreferredPaths = preferredPaths.map((path) => normalizePagePath(path));

  for (const preferredPath of normalizedPreferredPaths) {
    const exactMatch = records.find(
      (record) => normalizePagePath(record.url_path) === preferredPath,
    );

    if (exactMatch) {
      return exactMatch;
    }
  }

  return records[0] ?? null;
}
