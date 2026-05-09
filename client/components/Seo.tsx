import { Helmet } from 'react-helmet-async/lib/index.esm.js';
import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { buildAllSchemas, type SchemaInput } from '@site/lib/schemaHelpers';
import { useSiteSettings } from '@site/contexts/SiteSettingsContext';
import { getPublicEnv } from '@site/lib/runtimeEnv';

interface SeoProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  noindex?: boolean;
  /** Override OG title (falls back to page title if not set) */
  ogTitle?: string;
  /** Override OG description (falls back to description if not set) */
  ogDescription?: string;
  /** Override OG image */
  ogImage?: string;
  /** Schema.org type(s) — string, comma-separated, JSON array, or native array */
  schemaType?: string | string[] | null;
  /** Custom schema overrides from admin JSON editor */
  schemaData?: Record<string, unknown> | null;
  /** Structured page content for auto-detecting FAQ items etc. */
  pageContent?: unknown;
}

export default function Seo({
  title,
  description,
  canonical,
  image,
  noindex = false,
  ogTitle,
  ogDescription,
  ogImage,
  schemaType,
  schemaData,
  pageContent,
}: SeoProps) {
  const { pathname } = useLocation();
  const { settings } = useSiteSettings();

  // Use admin-configured Site URL, fall back to env var
  const siteUrl = settings.siteUrl || getPublicEnv('VITE_SITE_URL') || '';

  // Normalise pathname: ensure trailing slash for client-side navigation
  // (server redirects handle it for full-page loads, but React Router link
  //  clicks don't trigger a server round-trip, so we add the slash here).
  const normalizedPathname =
    pathname.length > 1 && !pathname.endsWith('/')
      ? `${pathname}/`
      : pathname;

  // Build full canonical URL
  const fullCanonical = canonical || (siteUrl ? `${siteUrl}${normalizedPathname}` : undefined);

  // Build full title using dynamic site name from settings
  const siteName = settings.siteName || '';
  const fullTitle = title
    ? (siteName ? `${title} | ${siteName}` : title)
    : siteName;

  // Default description
  const defaultDescription = 'Protecting your rights with integrity, experience, and relentless advocacy.';
  const fullDescription = description || defaultDescription;

  // Default image
  const defaultImage = 'https://cdn.builder.io/api/v1/image/assets%2F63b17c17cd28402ebbde4e53779092d0%2F4a50c7b6b66348e3a521b50cbb1563bb?format=webp&width=800&height=1200';
  const fullImage = image || defaultImage;

  // OG overrides — fall back to page-level values
  const resolvedOgTitle = ogTitle || fullTitle;
  const resolvedOgDescription = ogDescription || fullDescription;
  const resolvedOgImage = ogImage || fullImage;

  // Build JSON-LD structured data
  const schemas = useMemo(() => {
    if (!schemaType && !pageContent) return [];

    const input: SchemaInput = {
      title: fullTitle,
      description: fullDescription,
      url: fullCanonical || (siteUrl ? `${siteUrl}${normalizedPathname}` : ''),
      image: resolvedOgImage,
      schemaType,
      schemaData,
      pageContent,
      siteSettings: settings as any,
    };

    return buildAllSchemas(input);
  }, [schemaType, schemaData, pageContent, settings, fullTitle, fullDescription, fullCanonical, resolvedOgImage]);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />

      {(noindex || settings?.siteNoindex) && <meta name="robots" content="noindex, nofollow" />}

      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:type" content="website" />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      {resolvedOgImage && <meta property="og:image" content={resolvedOgImage} />}
      {resolvedOgImage && <meta property="og:image:secure_url" content={resolvedOgImage} />}
      {resolvedOgImage && <meta property="og:image:alt" content={settings.siteName || 'Site icon'} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDescription} />
      {resolvedOgImage && <meta name="twitter:image" content={resolvedOgImage} />}
      {resolvedOgImage && <meta name="twitter:image:alt" content={settings.siteName || 'Site icon'} />}

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, i) => (
        <script key={`ld-json-${i}`} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {/* Global Schema from Site Settings */}
      {settings.globalSchema && (() => {
        try {
          // Validate it's proper JSON before injecting
          const parsed = JSON.parse(settings.globalSchema);
          return (
            <script type="application/ld+json">
              {JSON.stringify(parsed)}
            </script>
          );
        } catch {
          return null;
        }
      })()}
    </Helmet>
  );
}
