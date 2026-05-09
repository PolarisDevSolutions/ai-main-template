export interface SharedHeroContent {
  h1Title: string;
  highlightedText: string;
  headline: string;
  description: string;
  trustText1: string;
  trustText2: string;
  trustText3: string;
  formTitle: string;
  phone?: string;
  phoneLabel: string;
}

type LegacyHeroContent = Partial<SharedHeroContent> & {
  sectionLabel?: string;
  tagline?: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
};

export function createDefaultSharedHeroContent(
  overrides: Partial<SharedHeroContent> = {},
): SharedHeroContent {
  return {
    h1Title: "",
    highlightedText: "",
    headline: "",
    description: "",
    trustText1: "",
    trustText2: "",
    trustText3: "",
    formTitle: "Pošaljite upit",
    phone: "",
    phoneLabel: "Pozovite nas",
    ...overrides,
  };
}

export function normalizeSharedHeroContent(
  value: unknown,
  defaults: SharedHeroContent,
): SharedHeroContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return defaults;
  }

  const hero = value as LegacyHeroContent;
  const isSharedShape =
    "h1Title" in hero ||
    "highlightedText" in hero ||
    "headline" in hero ||
    "formTitle" in hero ||
    "trustText1" in hero ||
    "trustText2" in hero ||
    "trustText3" in hero;

  if (isSharedShape) {
    return {
      ...defaults,
      ...hero,
      phone: hero.phone ?? defaults.phone,
      phoneLabel: hero.phoneLabel ?? defaults.phoneLabel,
    };
  }

  return {
    ...defaults,
    h1Title: hero.sectionLabel ?? defaults.h1Title,
    highlightedText: defaults.highlightedText,
    headline: hero.tagline ?? defaults.headline,
    description: hero.description ?? defaults.description,
    phone: hero.phone ?? defaults.phone,
    phoneLabel: hero.phoneLabel ?? defaults.phoneLabel,
  };
}
