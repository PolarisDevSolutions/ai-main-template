export type StructuredPageKind =
  | "home"
  | "about"
  | "contact"
  | "practice-areas"
  | "practice-area";

export const STRUCTURED_PAGE_PATHS = {
  home: "/",
  about: "/o-nama/",
  contact: "/kontakt/",
  "practice-areas": "/usluge/",
} as const satisfies Record<Exclude<StructuredPageKind, "practice-area">, string>;

const KIND_LOOKUP = Object.entries(STRUCTURED_PAGE_PATHS).reduce<
  Record<string, Exclude<StructuredPageKind, "practice-area">>
>((lookup, [kind, route]) => {
  lookup[normalizePagePath(route)] = kind as Exclude<StructuredPageKind, "practice-area">;
  return lookup;
}, {});

export function normalizePagePath(path: string | null | undefined) {
  if (!path || path === "/") {
    return "/";
  }

  return `/${path.replace(/^\/+|\/+$/g, "")}/`;
}

function isStructuredObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function detectStructuredPageKindFromContent(content: unknown) {
  if (!isStructuredObject(content)) {
    return null;
  }

  if ("features" in content && "mission" in content) {
    return "home" satisfies StructuredPageKind;
  }

  if ("story" in content && "missionVision" in content && "whyChooseUs" in content) {
    return "about" satisfies StructuredPageKind;
  }

  if ("contactMethods" in content && "officeHours" in content && "form" in content) {
    return "contact" satisfies StructuredPageKind;
  }

  if ("intro" in content && "grid" in content && "aboutSection" in content) {
    return "practice-areas" satisfies StructuredPageKind;
  }

  return null;
}

export function resolveStructuredPageKind(page: {
  url_path?: string | null;
  page_type?: string | null;
  content?: unknown;
}) {
  const normalizedPath = normalizePagePath(page.url_path);
  const directKind = KIND_LOOKUP[normalizedPath];

  if (directKind) {
    return directKind;
  }

  const contentKind = detectStructuredPageKindFromContent(page.content);

  if (contentKind) {
    return contentKind;
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
  return [normalizePagePath(path)];
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
