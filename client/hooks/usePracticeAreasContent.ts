import { useState, useEffect } from "react";
import type { PracticeAreasPageContent } from "../lib/cms/practiceAreasPageTypes";
import {
  applyAboutSharedSectionsToPracticeAreas,
  defaultPracticeAreasContent,
} from "../lib/cms/practiceAreasPageTypes";
import { normalizeSharedHeroContent } from "../lib/cms/sharedHero";
import type { PageMeta } from "../lib/cms/pageMeta";
import { emptyPageMeta } from "../lib/cms/pageMeta";
import type { AboutPageContent } from "../lib/cms/aboutPageTypes";
import { consumePageData } from '../lib/pageDataInjection';
import {
  buildPublishedPageLookupQuery,
  getEquivalentStructuredPaths,
  pickPreferredPageRecord,
  STRUCTURED_PAGE_PATHS,
} from '../lib/pageIdentity';
import { getPublicEnv } from '../lib/runtimeEnv';

// Supabase configuration - use environment variables
const SUPABASE_URL = getPublicEnv("VITE_SUPABASE_URL");
const SUPABASE_ANON_KEY = getPublicEnv("VITE_SUPABASE_ANON_KEY");

interface UsePracticeAreasContentResult {
  content: PracticeAreasPageContent;
  meta: PageMeta;
  isLoading: boolean;
  error: Error | null;
}

// Cache for practice areas content
let cachedContent: PracticeAreasPageContent | null = null;
let cachedMeta: PageMeta | null = null;

export function usePracticeAreasContent(): UsePracticeAreasContentResult {
  // Consume SSG-injected data synchronously before first render
  const injected = consumePageData(STRUCTURED_PAGE_PATHS["practice-areas"]);
  const initialContent = injected && isStructuredContent(injected.content)
    ? mergeWithDefaults(
        injected.content as Partial<PracticeAreasPageContent>,
        defaultPracticeAreasContent,
      )
    : (cachedContent ?? defaultPracticeAreasContent);
  const initialMeta = injected?.meta ?? (cachedMeta ?? emptyPageMeta);

  if (injected && !cachedContent) {
    cachedContent = initialContent;
    cachedMeta = initialMeta;
  }

  const [content, setContent] = useState<PracticeAreasPageContent>(initialContent);
  const [meta, setMeta] = useState<PageMeta>(initialMeta);
  const [isLoading, setIsLoading] = useState(!injected && !cachedContent);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchContent() {
      try {
        // Return cached content if available
        if (cachedContent) {
          if (isMounted) {
            setContent(cachedContent);
            setMeta(cachedMeta ?? emptyPageMeta);
            setIsLoading(false);
          }
          return;
        }

        // Fetch practice areas page from pages table
        const practiceAreasPaths = getEquivalentStructuredPaths(STRUCTURED_PAGE_PATHS["practice-areas"]);
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/pages?${buildPublishedPageLookupQuery(
            practiceAreasPaths,
            'url_path,content,meta_title,meta_description,canonical_url,og_title,og_description,og_image,noindex,schema_type,schema_data',
          )}`,
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
          // No CMS content, use defaults
          if (isMounted) {
            setContent(defaultPracticeAreasContent);
            setIsLoading(false);
          }
          return;
        }

        const pageData = pickPreferredPageRecord(data, practiceAreasPaths);

        if (!pageData) {
          if (isMounted) {
            setContent(defaultPracticeAreasContent);
            setIsLoading(false);
          }
          return;
        }
        const cmsContent = pageData.content as Partial<PracticeAreasPageContent>;
        let mergedContent = isStructuredContent(cmsContent)
          ? mergeWithDefaults(cmsContent, defaultPracticeAreasContent)
          : defaultPracticeAreasContent;

        // Fetch About page for globally-shared sections (whyChooseUs, cta)
        try {
          const aboutPaths = getEquivalentStructuredPaths(STRUCTURED_PAGE_PATHS.about);
          const aboutResp = await fetch(
            `${SUPABASE_URL}/rest/v1/pages?${buildPublishedPageLookupQuery(aboutPaths, 'url_path,content')}`,
            {
              headers: {
                apikey: SUPABASE_ANON_KEY,
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
              },
            },
          );
          if (aboutResp.ok) {
            const aboutData = await aboutResp.json();
            if (Array.isArray(aboutData) && aboutData.length > 0) {
              const aboutPage = pickPreferredPageRecord(aboutData, aboutPaths);
              const aboutContent = aboutPage?.content as Partial<AboutPageContent> | undefined;
              mergedContent = applyAboutSharedSectionsToPracticeAreas(
                mergedContent,
                aboutContent,
              );
            }
          }
        } catch (aboutErr) {
          console.warn("[usePracticeAreasContent] Failed to fetch About page for global sections:", aboutErr);
        }

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

        // Cache the result
        cachedContent = mergedContent;
        cachedMeta = pageMeta;

        if (isMounted) {
          setContent(mergedContent);
          setMeta(pageMeta);
          setError(null);
        }
      } catch (err) {
        console.error("[usePracticeAreasContent] Error:", err);
        if (isMounted) {
          setError(err instanceof Error ? err : new Error("Unknown error"));
          // Fall back to defaults on error
          setContent(defaultPracticeAreasContent);
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
  }, []);

  return { content, meta, isLoading, error };
}

function isStructuredContent(value: unknown) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

// Deep merge CMS content with defaults
function mergeWithDefaults(
  cmsContent: Partial<PracticeAreasPageContent> | null | undefined,
  defaults: PracticeAreasPageContent,
): PracticeAreasPageContent {
  if (!cmsContent) return defaults;

  return {
    hero: normalizeSharedHeroContent(cmsContent.hero, defaults.hero),
    intro: {
      ...defaults.intro,
      ...cmsContent.intro,
    },
    grid: {
      ...defaults.grid,
      ...cmsContent.grid,
      areas: cmsContent.grid?.areas?.length
        ? cmsContent.grid.areas.map((area) => ({
            icon: area.icon ?? "",
            title: area.title ?? "",
            description: area.description ?? "",
            image: area.image ?? "",
            imageAlt: area.imageAlt ?? "",
            link: area.link ?? "",
            linkLabel: area.linkLabel ?? "",
          }))
        : defaults.grid.areas,
    },
    aboutSection: {
      ...defaults.aboutSection,
      ...cmsContent.aboutSection,
      features: cmsContent.aboutSection?.features?.length
        ? cmsContent.aboutSection.features
        : defaults.aboutSection.features,
    },
    outro: {
      ...defaults.outro,
      ...cmsContent.outro,
    },
    process: {
      ...defaults.process,
      ...cmsContent.process,
      steps: cmsContent.process?.steps?.length
        ? cmsContent.process.steps
        : defaults.process.steps,
    },
    whyChoose: {
      ...defaults.whyChoose,
      ...cmsContent.whyChoose,
      items: cmsContent.whyChoose?.items?.length
        ? cmsContent.whyChoose.items
        : defaults.whyChoose.items,
    },
    faq: {
      ...defaults.faq,
      ...cmsContent.faq,
      items: cmsContent.faq?.items?.length
        ? cmsContent.faq.items
        : defaults.faq.items,
    },
    cta: {
      ...defaults.cta,
      ...cmsContent.cta,
      primaryButton: {
        ...defaults.cta.primaryButton,
        ...cmsContent.cta?.primaryButton,
      },
      secondaryButton: {
        ...defaults.cta.secondaryButton,
        ...cmsContent.cta?.secondaryButton,
      },
    },
    headingTags: {
      ...defaults.headingTags,
      ...cmsContent.headingTags,
    },
  };
}

// Helper to clear cache (useful after admin edits)
export function clearPracticeAreasContentCache() {
  cachedContent = null;
  cachedMeta = null;
}
