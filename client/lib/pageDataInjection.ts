import type { PageMeta } from "@site/lib/cms/pageMeta";
import type { SiteSettings } from "@site/contexts/SiteSettingsContext";
import { getEquivalentStructuredPaths, normalizePagePath } from "@site/lib/pageIdentity";

export interface InjectedPostData {
  id: string;
  title: string;
  slug: string;
  body: string | null;
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
  published_at: string | null;
  created_at: string | null;
  post_categories: { name: string; slug: string } | null;
}

export interface InjectedAwardImage {
  src: string;
  alt: string;
}

export interface InjectedBlogSidebarData {
  attorneyImage: string;
  awardImages: InjectedAwardImage[];
}

export interface InjectedPageData {
  urlPath: string;
  title?: string;
  content?: unknown;
  meta: PageMeta;
  post?: InjectedPostData;
  siteSettings?: SiteSettings;
  blogPosts?: InjectedPostData[];
  relatedPosts?: InjectedPostData[];
  blogSidebar?: InjectedBlogSidebarData | null;
}

declare global {
  interface Window {
    __PAGE_DATA__?: InjectedPageData;
  }
}

let serverPageData: InjectedPageData | null = null;

export function setServerPageData(data: InjectedPageData | null) {
  serverPageData = data;
}

export const normalizeUrlPath = normalizePagePath;

function getBrowserPageData(): InjectedPageData | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.__PAGE_DATA__ ?? null;
}

export function getInjectedPageData(urlPath: string): InjectedPageData | null {
  const data = serverPageData ?? getBrowserPageData();

  if (!data) {
    return null;
  }

  const requestedPaths = getEquivalentStructuredPaths(urlPath);
  const actualPath = normalizeUrlPath(data.urlPath);

  return requestedPaths.includes(actualPath) ? data : null;
}

export function consumePageData(urlPath: string): InjectedPageData | null {
  return getInjectedPageData(urlPath);
}
