import { useState, useEffect, useRef } from "react";
import type { PracticeAreaPageContent } from "../lib/cms/practiceAreaPageTypes";
import { defaultPracticeAreaPageContent } from "../lib/cms/practiceAreaPageTypes";
import { normalizeSharedHeroContent } from "../lib/cms/sharedHero";
import type { PageMeta } from "../lib/cms/pageMeta";
import { emptyPageMeta } from "../lib/cms/pageMeta";
import { consumePageData } from '../lib/pageDataInjection';
import { getPublicEnv } from '../lib/runtimeEnv';

const SUPABASE_URL = getPublicEnv("VITE_SUPABASE_URL");
const SUPABASE_ANON_KEY = getPublicEnv("VITE_SUPABASE_ANON_KEY");

interface UsePracticeAreaPageContentResult {
  content: PracticeAreaPageContent;
  meta: PageMeta;
  title: string;
  isLoading: boolean;
  error: Error | null;
  notFound: boolean;
}

// Cache by url_path
const cache = new Map<
  string,
  { content: PracticeAreaPageContent; meta: PageMeta; title: string }
>();

export function usePracticeAreaPageContent(
  slug: string | undefined,
): UsePracticeAreaPageContentResult {
  // Consume SSG-injected data synchronously before first render
  const urlPath = slug ? `/practice-areas/${slug}/` : '';
  const injected = slug ? consumePageData(urlPath) : null;
  const initialContent = injected && isStructuredContent(injected.content)
    ? {
        ...(injected.content as PracticeAreaPageContent),
        hero: normalizeSharedHeroContent(
          (injected.content as PracticeAreaPageContent).hero,
          defaultPracticeAreaPageContent.hero,
        ),
      }
    : (urlPath && cache.has(urlPath) ? cache.get(urlPath)!.content : defaultPracticeAreaPageContent);
  const initialMeta = injected?.meta ?? (urlPath && cache.has(urlPath) ? cache.get(urlPath)!.meta : emptyPageMeta);
  const initialTitle = injected?.title ?? (urlPath && cache.has(urlPath) ? cache.get(urlPath)!.title : '');

  // Seed Map cache
  if (injected && urlPath && !cache.has(urlPath)) {
    cache.set(urlPath, { content: initialContent, meta: initialMeta, title: initialTitle });
  }

  const [content, setContent] = useState<PracticeAreaPageContent>(initialContent);
  const [meta, setMeta] = useState<PageMeta>(initialMeta);
  const [title, setTitle] = useState(initialTitle);
  const [isLoading, setIsLoading] = useState(!injected && !(urlPath && cache.has(urlPath)));
  const [error, setError] = useState<Error | null>(null);
  const [notFound, setNotFound] = useState(false);
  const prevSlug = useRef(slug);

  useEffect(() => {
    // Reset when slug changes
    if (prevSlug.current !== slug) {
      prevSlug.current = slug;
      setIsLoading(true);
      setError(null);
      setNotFound(false);
    }

    if (!slug) {
      setNotFound(true);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    const urlPath = `/practice-areas/${slug}/`;

    async function fetchContent() {
      try {
        // Check cache
        const cached = cache.get(urlPath);
        if (cached) {
          if (isMounted) {
            setContent(cached.content);
            setMeta(cached.meta);
            setTitle(cached.title);
            setIsLoading(false);
            setNotFound(false);
          }
          return;
        }

        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/pages?url_path=eq.${encodeURIComponent(urlPath)}&status=eq.published&select=title,content,meta_title,meta_description,canonical_url,og_title,og_description,og_image,noindex,schema_type,schema_data`,
          {
            headers: {
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        if (!Array.isArray(data) || data.length === 0) {
          if (isMounted) {
            setNotFound(true);
            setIsLoading(false);
          }
          return;
        }

        const pageData = data[0];
        const cmsContent = pageData.content as Partial<PracticeAreaPageContent>;
        const mergedContent = isStructuredContent(cmsContent)
          ? mergeWithDefaults(cmsContent as PracticeAreaPageContent, defaultPracticeAreaPageContent)
          : defaultPracticeAreaPageContent;

        const pageMeta: PageMeta = {
          meta_title: pageData.meta_title,
          meta_description: pageData.meta_description,
          canonical_url: pageData.canonical_url,
          og_title: pageData.og_title,
          og_description: pageData.og_description,
          og_image: pageData.og_image,
          noindex: pageData.noindex,
          schema_type: pageData.schema_type,
          schema_data: pageData.schema_data,
        };

        const pageTitle = pageData.title || "";

        // Cache
        cache.set(urlPath, {
          content: mergedContent,
          meta: pageMeta,
          title: pageTitle,
        });

        if (isMounted) {
          setContent(mergedContent);
          setMeta(pageMeta);
          setTitle(pageTitle);
          setNotFound(false);
          setError(null);
        }
      } catch (err) {
        console.error("[usePracticeAreaPageContent] Error:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
          setContent(defaultPracticeAreaPageContent);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchContent();

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return { content, meta, title, isLoading, error, notFound };
}

function isStructuredContent(value: unknown) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeWithDefaults(
  cms: Partial<PracticeAreaPageContent> | null | undefined,
  defaults: PracticeAreaPageContent,
): PracticeAreaPageContent {
  if (!cms) return defaults;

  return {
    hero: normalizeSharedHeroContent(cms.hero, defaults.hero),
    socialProof: {
      ...defaults.socialProof,
      ...cms.socialProof,
      testimonials:
        cms.socialProof?.testimonials?.length
          ? cms.socialProof.testimonials
          : defaults.socialProof.testimonials,
      awards: {
        ...defaults.socialProof.awards,
        ...cms.socialProof?.awards,
        logos:
          cms.socialProof?.awards?.logos?.length
            ? cms.socialProof.awards.logos
            : defaults.socialProof.awards.logos,
      },
    },
    contentSections:
      cms.contentSections?.length
        ? cms.contentSections
        : defaults.contentSections,
    faq: {
      ...defaults.faq,
      ...cms.faq,
      items: cms.faq?.items?.length ? cms.faq.items : defaults.faq.items,
    },
    headingTags: cms.headingTags ?? defaults.headingTags,
  };
}

/** Clear cache for a specific practice area or all practice areas */
export function clearPracticeAreaPageCache(slug?: string) {
  if (slug) {
    cache.delete(`/practice-areas/${slug}/`);
  } else {
    // Clear all practice area caches
    for (const key of cache.keys()) {
      cache.delete(key);
    }
  }
}
