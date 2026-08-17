export function normalizeSiteOrigin(value: string | undefined | null): string {
  const trimmed = value?.trim();
  if (!trimmed) return "";

  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(withProtocol).origin;
  } catch {
    return "";
  }
}

export function resolveCanonicalUrl(
  value: string | undefined | null,
  origin: string,
  pathname: string,
): string | undefined {
  if (!origin) return undefined;

  try {
    return new URL(value?.trim() || pathname, `${origin}/`).toString();
  } catch {
    return new URL(pathname, `${origin}/`).toString();
  }
}
