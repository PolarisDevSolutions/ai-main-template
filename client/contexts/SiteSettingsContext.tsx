import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { getPublicEnv } from "@site/lib/runtimeEnv";

export interface SiteSettings {
  siteName: string;
  logoUrl: string;
  logoAlt: string;
  phoneNumber: string;
  phoneDisplay: string;
  phoneAvailability: string;
  applyPhoneGlobally: boolean;
  headerCtaText: string;
  headerCtaUrl: string;
  navigationItems: {
    label: string;
    href: string;
    order?: number;
    openInNewTab?: boolean;
    children?: { label: string; href: string; openInNewTab?: boolean }[];
  }[];
  footerAboutLinks: { label: string; href?: string }[];
  footerPracticeLinks: { label: string; href?: string }[];
  footerColumn1Label: string;
  footerColumn2Label: string;
  footerColumn4Label: string;
  footerLogoText: string;
  footerColumn4Content: string;
  footerTaglineHtml: string;
  addressLine1: string;
  addressLine2: string;
  mapEmbedUrl: string;
  socialLinks: { platform: string; url: string; enabled: boolean }[];
  copyrightText: string;
  siteUrl: string;
  siteNoindex: boolean;
  ga4MeasurementId: string;
  googleAdsId: string;
  googleAdsConversionLabel: string;
  headScripts: string;
  footerScripts: string;
  globalSchema: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: "",
  logoUrl: "",
  logoAlt: "",
  phoneNumber: "",
  phoneDisplay: "",
  phoneAvailability: "",
  applyPhoneGlobally: true,
  headerCtaText: "Kontakt",
  headerCtaUrl: "/kontakt/",
  navigationItems: [
    { label: "Početna", href: "/", order: 1 },
    { label: "O Nama", href: "/o-nama/", order: 2 },
    { label: "Usluge", href: "/usluge/", order: 3 },
    { label: "Kontakt", href: "/kontakt/", order: 4 },
  ],
  footerAboutLinks: [],
  footerPracticeLinks: [],
  footerColumn1Label: "",
  footerColumn2Label: "",
  footerColumn4Label: "",
  footerLogoText: "",
  footerColumn4Content: "",
  footerTaglineHtml: "",
  addressLine1: "",
  addressLine2: "",
  mapEmbedUrl: "",
  socialLinks: [],
  copyrightText: `Copyright © ${new Date().getFullYear()} | All Rights Reserved`,
  siteUrl: "",
  siteNoindex: false,
  ga4MeasurementId: "",
  googleAdsId: "",
  googleAdsConversionLabel: "",
  headScripts: "",
  footerScripts: "",
  globalSchema: "",
};

interface SiteSettingsRowLike {
  site_name?: string | null;
  logo_url?: string | null;
  logo_alt?: string | null;
  phone_number?: string | null;
  phone_display?: string | null;
  phone_availability?: string | null;
  apply_phone_globally?: boolean | null;
  header_cta_text?: string | null;
  header_cta_url?: string | null;
  navigation_items?: SiteSettings["navigationItems"] | null;
  footer_about_links?: SiteSettings["footerAboutLinks"] | null;
  footer_practice_links?: SiteSettings["footerPracticeLinks"] | null;
  footer_column1_label?: string | null;
  footer_column2_label?: string | null;
  footer_column4_label?: string | null;
  footer_logo_text?: string | null;
  footer_column4_content?: string | null;
  footer_tagline_html?: string | null;
  address_line1?: string | null;
  address_line2?: string | null;
  map_embed_url?: string | null;
  social_links?: SiteSettings["socialLinks"] | null;
  copyright_text?: string | null;
  site_url?: string | null;
  site_noindex?: boolean | null;
  ga4_measurement_id?: string | null;
  google_ads_id?: string | null;
  google_ads_conversion_label?: string | null;
  head_scripts?: string | null;
  footer_scripts?: string | null;
  global_schema?: string | null;
}

export function resolveSiteSettings(
  row?: SiteSettingsRowLike | null,
): SiteSettings {
  if (!row) {
    return DEFAULT_SETTINGS;
  }

  return {
    siteName: row.site_name || DEFAULT_SETTINGS.siteName,
    logoUrl: row.logo_url || DEFAULT_SETTINGS.logoUrl,
    logoAlt: row.logo_alt || DEFAULT_SETTINGS.logoAlt,
    phoneNumber: row.phone_number || DEFAULT_SETTINGS.phoneNumber,
    phoneDisplay: row.phone_display || DEFAULT_SETTINGS.phoneDisplay,
    phoneAvailability:
      row.phone_availability || DEFAULT_SETTINGS.phoneAvailability,
    applyPhoneGlobally:
      row.apply_phone_globally ?? DEFAULT_SETTINGS.applyPhoneGlobally,
    headerCtaText: row.header_cta_text || DEFAULT_SETTINGS.headerCtaText,
    headerCtaUrl: row.header_cta_url || DEFAULT_SETTINGS.headerCtaUrl,
    navigationItems: row.navigation_items?.length
      ? row.navigation_items
      : DEFAULT_SETTINGS.navigationItems,
    footerAboutLinks:
      row.footer_about_links || DEFAULT_SETTINGS.footerAboutLinks,
    footerPracticeLinks:
      row.footer_practice_links || DEFAULT_SETTINGS.footerPracticeLinks,
    footerColumn1Label:
      row.footer_column1_label || DEFAULT_SETTINGS.footerColumn1Label,
    footerColumn2Label:
      row.footer_column2_label || DEFAULT_SETTINGS.footerColumn2Label,
    footerColumn4Label:
      row.footer_column4_label || DEFAULT_SETTINGS.footerColumn4Label,
    footerLogoText: row.footer_logo_text || DEFAULT_SETTINGS.footerLogoText,
    footerColumn4Content:
      row.footer_column4_content || DEFAULT_SETTINGS.footerColumn4Content,
    footerTaglineHtml:
      row.footer_tagline_html || DEFAULT_SETTINGS.footerTaglineHtml,
    addressLine1: row.address_line1 || DEFAULT_SETTINGS.addressLine1,
    addressLine2: row.address_line2 || DEFAULT_SETTINGS.addressLine2,
    mapEmbedUrl: row.map_embed_url || DEFAULT_SETTINGS.mapEmbedUrl,
    socialLinks: row.social_links || DEFAULT_SETTINGS.socialLinks,
    copyrightText: row.copyright_text || DEFAULT_SETTINGS.copyrightText,
    siteUrl: row.site_url || DEFAULT_SETTINGS.siteUrl,
    siteNoindex: row.site_noindex ?? DEFAULT_SETTINGS.siteNoindex,
    ga4MeasurementId:
      row.ga4_measurement_id || DEFAULT_SETTINGS.ga4MeasurementId,
    googleAdsId: row.google_ads_id || DEFAULT_SETTINGS.googleAdsId,
    googleAdsConversionLabel:
      row.google_ads_conversion_label ||
      DEFAULT_SETTINGS.googleAdsConversionLabel,
    headScripts: row.head_scripts || DEFAULT_SETTINGS.headScripts,
    footerScripts: row.footer_scripts || DEFAULT_SETTINGS.footerScripts,
    globalSchema: row.global_schema || DEFAULT_SETTINGS.globalSchema,
  };
}

interface SiteSettingsContextValue {
  settings: SiteSettings;
  isLoading: boolean;
  phoneDisplay: string;
  phoneLabel: string;
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null);

const SUPABASE_URL = getPublicEnv("VITE_SUPABASE_URL");
const SUPABASE_ANON_KEY = getPublicEnv("VITE_SUPABASE_ANON_KEY");

let settingsCache: SiteSettings | null = null;

export function clearSiteSettingsCache() {
  settingsCache = null;
}

interface SiteSettingsProviderProps {
  children: ReactNode;
  initialSettings?: SiteSettings | null;
}

export function SiteSettingsProvider({
  children,
  initialSettings,
}: SiteSettingsProviderProps) {
  const seededSettings = initialSettings || settingsCache || DEFAULT_SETTINGS;
  const [settings, setSettings] = useState<SiteSettings>(seededSettings);
  const [isLoading, setIsLoading] = useState(!initialSettings && !settingsCache);

  useEffect(() => {
    if (initialSettings) {
      settingsCache = initialSettings;
      setSettings(initialSettings);
      setIsLoading(false);
      return;
    }

    if (settingsCache) {
      setSettings(settingsCache);
      setIsLoading(false);
      return;
    }

    async function fetchSettings() {
      try {
        const response = await fetch(
          `${SUPABASE_URL}/rest/v1/site_settings_public?settings_key=eq.global&select=*`,
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

        if (Array.isArray(data) && data.length > 0) {
          const loadedSettings = resolveSiteSettings(data[0]);
          settingsCache = loadedSettings;
          setSettings(loadedSettings);
        }
      } catch (err) {
        console.error("[SiteSettingsContext] Error loading settings:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, [initialSettings]);

  const value: SiteSettingsContextValue = {
    settings,
    isLoading,
    phoneDisplay: settings.phoneDisplay,
    phoneLabel: settings.phoneAvailability,
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings(): SiteSettingsContextValue {
  const context = useContext(SiteSettingsContext);

  if (!context) {
    return {
      settings: DEFAULT_SETTINGS,
      isLoading: false,
      phoneDisplay: DEFAULT_SETTINGS.phoneDisplay,
      phoneLabel: DEFAULT_SETTINGS.phoneAvailability,
    };
  }

  return context;
}

export function useGlobalPhone() {
  const { settings, isLoading } = useSiteSettings();

  return {
    phoneNumber: settings.phoneNumber,
    phoneDisplay: settings.phoneDisplay,
    phoneLabel: settings.phoneAvailability,
    isLoading,
  };
}
