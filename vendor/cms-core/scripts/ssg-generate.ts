import "dotenv/config";
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import { defaultPracticeAreaPageContent } from "../../../client/lib/cms/practiceAreaPageTypes";
import { renderPage } from "../../../client/entry-server";
import { resolveSiteSettings } from "../../../client/contexts/SiteSettingsContext";
import type {
  InjectedBlogSidebarData,
  InjectedPageData,
  InjectedPostData,
} from "../../../client/lib/pageDataInjection";
import type { Database } from "../client/lib/database.types";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.log("Supabase credentials not configured. Skipping SSG generation.");
  console.log(
    "To enable SSG, set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables.",
  );
  process.exit(0);
}

const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);

interface Page {
  id: string;
  title: string;
  url_path: string;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  noindex: boolean;
  updated_at: string;
  content: unknown;
  schema_type: string | null;
  schema_data: Record<string, unknown> | null;
}

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category_id: string | null;
  meta_title: string | null;
  meta_description: string | null;
  canonical_url: string | null;
  og_title: string | null;
  og_description: string | null;
  og_image: string | null;
  noindex: boolean;
  updated_at: string;
  body: string | null;
  published_at: string | null;
  created_at: string;
  post_categories: { name: string; slug: string } | null;
}

interface Redirect {
  from_path: string;
  to_path: string;
  status_code: number;
}

interface SiteSettingsRow {
  site_url: string | null;
  site_noindex: boolean;
  site_name: string | null;
  ga4_measurement_id: string | null;
  google_ads_id: string | null;
  google_ads_conversion_label: string | null;
  head_scripts: string | null;
  footer_scripts: string | null;
  navigation_items: unknown[] | null;
  footer_about_links: unknown[] | null;
  footer_practice_links: unknown[] | null;
  footer_column1_label: string | null;
  footer_column2_label: string | null;
  footer_column4_label: string | null;
  footer_logo_text: string | null;
  footer_column4_content: string | null;
  footer_tagline_html: string | null;
  global_schema: string | null;
  phone_number: string | null;
  phone_display: string | null;
  phone_availability: string | null;
  apply_phone_globally: boolean | null;
  header_cta_text: string | null;
  header_cta_url: string | null;
  address_line1: string | null;
  address_line2: string | null;
  map_embed_url: string | null;
  logo_url: string | null;
  logo_alt: string | null;
  social_links: unknown[] | null;
  copyright_text: string | null;
}

interface BlogSidebarRow {
  attorney_image: string;
  award_images: { src: string; alt: string }[];
}

async function ensurePracticeAreaPage() {
  const practiceAreaUrl = "/practice-areas/practice-area/";

  const { data: existing, error: checkError } = await supabase
    .from("pages")
    .select("id")
    .eq("url_path", practiceAreaUrl)
    .maybeSingle();

  if (checkError) {
    console.error("[ensurePracticeAreaPage] Error checking for page:", checkError.message);
    return;
  }

  if (existing) {
    return;
  }

  const { error: insertError } = await supabase.from("pages").insert({
    title: "Practice Area",
    url_path: practiceAreaUrl,
    page_type: "practice",
    status: "published",
    content: defaultPracticeAreaPageContent as unknown as Record<string, unknown>,
  });

  if (insertError) {
    console.error("[ensurePracticeAreaPage] Failed to insert page:", insertError.message);
  }
}

function pageMetaFromRecord(record: Page | Post) {
  return {
    meta_title: record.meta_title,
    meta_description: record.meta_description,
    canonical_url: record.canonical_url,
    og_title: record.og_title,
    og_description: record.og_description,
    og_image: record.og_image,
    noindex: record.noindex,
    schema_type: "schema_type" in record ? record.schema_type : null,
    schema_data: "schema_data" in record ? record.schema_data : null,
  };
}

function normalizePageUrl(urlPath: string) {
  return urlPath === "/" ? "/" : `/${urlPath.replace(/^\/+|\/+$/g, "")}/`;
}

function normalizeSlug(slug: string) {
  return slug.replace(/^\/+|\/+$/g, "");
}

function toInjectedPost(post: Post): InjectedPostData {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    body: post.body,
    excerpt: post.excerpt ?? null,
    featured_image: post.featured_image,
    category_id: post.category_id ?? null,
    meta_title: post.meta_title,
    meta_description: post.meta_description,
    canonical_url: post.canonical_url,
    og_title: post.og_title,
    og_description: post.og_description,
    og_image: post.og_image,
    noindex: post.noindex,
    published_at: post.published_at ?? null,
    created_at: post.created_at ?? null,
    post_categories: post.post_categories ?? null,
  };
}

function resolveBlogSidebar(row?: BlogSidebarRow | null): InjectedBlogSidebarData | null {
  if (!row) {
    return null;
  }

  return {
    attorneyImage: row.attorney_image || "",
    awardImages: Array.isArray(row.award_images) ? row.award_images : [],
  };
}

function mergePracticeAreasContentWithAbout(
  pageContent: unknown,
  aboutContent: unknown,
) {
  if (!pageContent || typeof pageContent !== "object") {
    return pageContent;
  }

  if (!aboutContent || typeof aboutContent !== "object") {
    return pageContent;
  }

  const merged = JSON.parse(JSON.stringify(pageContent));
  const about = aboutContent as any;

  if (about?.whyChooseUs) {
    merged.whyChoose = {
      ...merged.whyChoose,
      sectionLabel: about.whyChooseUs.sectionLabel || merged.whyChoose?.sectionLabel,
      heading: about.whyChooseUs.heading || merged.whyChoose?.heading,
      subtitle: merged.whyChoose?.subtitle,
      description: about.whyChooseUs.description || merged.whyChoose?.description,
      image: about.whyChooseUs.image || merged.whyChoose?.image,
      imageAlt: about.whyChooseUs.imageAlt || merged.whyChoose?.imageAlt,
      items: about.whyChooseUs.items?.length
        ? about.whyChooseUs.items
        : merged.whyChoose?.items,
    };
  }

  if (about?.cta) {
    merged.cta = {
      ...merged.cta,
      heading: about.cta.heading || merged.cta?.heading,
      description: about.cta.description || merged.cta?.description,
      primaryButton: {
        ...merged.cta?.primaryButton,
        ...about.cta.primaryButton,
      },
      secondaryButton: {
        ...merged.cta?.secondaryButton,
        ...about.cta.secondaryButton,
      },
    };
  }

  return merged;
}

function mergeContactContentWithAbout(pageContent: unknown, aboutContent: unknown) {
  if (!pageContent || typeof pageContent !== "object") {
    return pageContent;
  }

  if (!aboutContent || typeof aboutContent !== "object") {
    return pageContent;
  }

  const merged = JSON.parse(JSON.stringify(pageContent));
  const about = aboutContent as any;

  if (about?.cta) {
    merged.cta = {
      ...merged.cta,
      heading: about.cta.heading || merged.cta?.heading,
      description: about.cta.description || merged.cta?.description,
      primaryButton: {
        ...merged.cta?.primaryButton,
        ...about.cta.primaryButton,
      },
      secondaryButton: {
        ...merged.cta?.secondaryButton,
        ...about.cta.secondaryButton,
      },
    };
  }

  return merged;
}

function serializeForScript(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

function getHelmetHead(helmet: any) {
  if (!helmet) {
    return "";
  }

  return [
    helmet.title?.toString() || "",
    helmet.priority?.toString() || "",
    helmet.meta?.toString() || "",
    helmet.link?.toString() || "",
    helmet.style?.toString() || "",
    helmet.script?.toString() || "",
    helmet.noscript?.toString() || "",
  ]
    .filter(Boolean)
    .join("\n");
}

function injectRenderedHtml(template: string, renderedHtml: string) {
  return template.replace(
    /<div id="root">[\s\S]*?<\/div>/,
    `<div id="root">${renderedHtml}</div>`,
  );
}

function generatePageHtml({
  template,
  payload,
  siteSettingsRow,
}: {
  template: string;
  payload: InjectedPageData;
  siteSettingsRow: SiteSettingsRow | null;
}) {
  const { html: renderedHtml, helmet } = renderPage({
    url: payload.urlPath,
    initialData: payload,
  });

  const analyticsScripts: string[] = [];

  if (siteSettingsRow?.ga4_measurement_id) {
    analyticsScripts.push(`
<script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(siteSettingsRow.ga4_measurement_id)}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${escapeHtml(siteSettingsRow.ga4_measurement_id)}');
</script>`);
  }

  if (siteSettingsRow?.google_ads_id) {
    if (!siteSettingsRow.ga4_measurement_id) {
      analyticsScripts.push(`
<script async src="https://www.googletagmanager.com/gtag/js?id=${escapeHtml(siteSettingsRow.google_ads_id)}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
</script>`);
    }

    analyticsScripts.push(`
<script>
  gtag('config', '${escapeHtml(siteSettingsRow.google_ads_id)}');
</script>`);
  }

  const helmetHead = getHelmetHead(helmet);
  const dataScript = `<script>window.__PAGE_DATA__=${serializeForScript(payload)}</script>`;
  const headInjection = [
    analyticsScripts.join("\n"),
    siteSettingsRow?.head_scripts || "",
    dataScript,
    helmetHead,
  ]
    .filter(Boolean)
    .join("\n");

  let html = template.replace(/<title>.*?<\/title>/s, "");
  html = injectRenderedHtml(html, renderedHtml);
  html = html.replace("</head>", `${headInjection}\n</head>`);

  if (siteSettingsRow?.footer_scripts) {
    html = html.replace("</body>", `${siteSettingsRow.footer_scripts}\n</body>`);
  }

  return html;
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function generateSSG() {
  console.log("Starting SSG generation...");

  await ensurePracticeAreaPage();

  const [{ data: siteSettingsRow }, { data: pages, error: pagesError }, { data: posts, error: postsError }, { data: redirects, error: redirectsError }, { data: blogSidebarRows }] = await Promise.all([
    supabase
      .from("site_settings")
      .select("site_url, site_noindex, site_name, ga4_measurement_id, google_ads_id, google_ads_conversion_label, head_scripts, footer_scripts, navigation_items, footer_about_links, footer_practice_links, footer_column1_label, footer_column2_label, footer_column4_label, footer_logo_text, footer_column4_content, footer_tagline_html, global_schema, phone_number, phone_display, phone_availability, apply_phone_globally, header_cta_text, header_cta_url, address_line1, address_line2, map_embed_url, logo_url, logo_alt, social_links, copyright_text")
      .eq("settings_key", "global")
      .maybeSingle(),
    supabase
      .from("pages")
      .select("id, title, url_path, meta_title, meta_description, canonical_url, og_title, og_description, og_image, noindex, updated_at, content, schema_type, schema_data")
      .eq("status", "published"),
    supabase
      .from("posts")
      .select("id, title, slug, excerpt, featured_image, category_id, meta_title, meta_description, canonical_url, og_title, og_description, og_image, noindex, updated_at, body, published_at, created_at, post_categories(name,slug)")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false }),
    supabase
      .from("redirects")
      .select("from_path, to_path, status_code")
      .eq("enabled", true),
    supabase
      .from("blog_sidebar_settings")
      .select("attorney_image, award_images")
      .limit(1),
  ]);

  if (pagesError) {
    console.error("Error fetching pages:", pagesError);
    process.exit(1);
  }

  if (postsError) {
    console.error("Error fetching posts:", postsError);
    process.exit(1);
  }

  const templatePath = path.join(process.cwd(), "dist/spa/index.html");
  if (!fs.existsSync(templatePath)) {
    console.error("Template not found at dist/spa/index.html. Run build:client first.");
    process.exit(1);
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  const siteSettings = resolveSiteSettings(siteSettingsRow || null);
  const blogSidebar = resolveBlogSidebar(blogSidebarRows?.[0] as BlogSidebarRow | undefined);
  const postsList = (posts || []) as Post[];
  const injectedPosts = postsList.map(toInjectedPost);
  const aboutPage = (pages || []).find((page) => page.url_path === "/about/");
  const aboutContent = aboutPage?.content;

  console.log(`Found ${pages?.length || 0} published pages`);
  console.log(`Found ${posts?.length || 0} published posts`);

  for (const page of (pages || []) as Page[]) {
    const normalizedUrlPath = normalizePageUrl(page.url_path);
    let pageContent = page.content;

    if (normalizedUrlPath === "/practice-areas/") {
      pageContent = mergePracticeAreasContentWithAbout(pageContent, aboutContent);
    }

    if (normalizedUrlPath === "/contact/") {
      pageContent = mergeContactContentWithAbout(pageContent, aboutContent);
    }

    const payload: InjectedPageData = {
      urlPath: normalizedUrlPath,
      title: page.title,
      content: pageContent,
      meta: pageMetaFromRecord(page),
      siteSettings,
      blogPosts: normalizedUrlPath === "/blog/" ? injectedPosts : undefined,
    };

    const html = generatePageHtml({
      template,
      payload,
      siteSettingsRow: siteSettingsRow || null,
    });

    const outputPath =
      normalizedUrlPath === "/"
        ? path.join(process.cwd(), "dist/spa/index.html")
        : path.join(process.cwd(), "dist/spa", normalizedUrlPath.slice(1), "index.html");

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
    console.log(`Generated: ${normalizedUrlPath}`);
  }

  for (const post of postsList) {
    const normalizedPostSlug = normalizeSlug(post.slug);
    if (!normalizedPostSlug) {
      continue;
    }

    const urlPath = `/blog/${normalizedPostSlug}/`;
    const payload: InjectedPageData = {
      urlPath,
      title: post.title,
      meta: pageMetaFromRecord(post),
      post: toInjectedPost(post),
      siteSettings,
      blogSidebar,
      relatedPosts: injectedPosts.filter((item) => item.id !== post.id).slice(0, 3),
    };

    const html = generatePageHtml({
      template,
      payload,
      siteSettingsRow: siteSettingsRow || null,
    });

    const outputPath = path.join(process.cwd(), "dist/spa", "blog", normalizedPostSlug, "index.html");
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html);
    console.log(`Generated post: ${urlPath}`);
  }

  const functionRedirects = [
    "/sitemap.xml /.netlify/functions/sitemap 200",
    "/sitemap-pages.xml /.netlify/functions/sitemap-pages 200",
    "/sitemap-posts.xml /.netlify/functions/sitemap-posts 200",
    "/api/* /.netlify/functions/api/:splat 200",
  ].join("\n");

  if (redirectsError) {
    console.error("Error fetching redirects:", redirectsError);
  }

  const cmsRedirects = (redirects || [])
    .map((redirect: Redirect) => `${redirect.from_path} ${redirect.to_path} ${redirect.status_code}`)
    .join("\n");

  const redirectsContent = [functionRedirects, cmsRedirects, "/* /index.html 200"]
    .filter(Boolean)
    .join("\n");

  fs.writeFileSync(path.join(process.cwd(), "dist/spa/_redirects"), redirectsContent);

  const siteUrl = (process.env.SITE_URL || siteSettingsRow?.site_url || "").replace(/\/+$/g, "");

  if (siteUrl) {
    const robotsTxt = siteSettingsRow?.site_noindex
      ? "User-agent: *\nDisallow: /"
      : `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml`;

    fs.writeFileSync(path.join(process.cwd(), "dist/spa/robots.txt"), robotsTxt);
  }

  console.log("SSG generation complete!");
}

generateSSG().catch((error) => {
  console.error("SSG generation failed:", error);
  process.exit(1);
});
