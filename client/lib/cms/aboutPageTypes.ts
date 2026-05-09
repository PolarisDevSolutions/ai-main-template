import {
  createDefaultSharedHeroContent,
  normalizeSharedHeroContent,
  type SharedHeroContent,
} from "./sharedHero";
import { defaultHomeContent, type AboutContent } from "./homePageTypes";

// Each section maps directly to a static component's data needs

export type AboutHeroContent = SharedHeroContent;
export type StoryContent = AboutContent;

type LegacyStoryContent = Partial<StoryContent> & {
  paragraphs?: string[];
  image?: string;
  imageAlt?: string;
};

function cloneStoryContent(content: AboutContent): StoryContent {
  return {
    ...content,
    features: content.features.map((feature) => ({ ...feature })),
    stats: content.stats.map((stat) => ({ ...stat })),
  };
}

export function createDefaultAboutStoryContent(
  overrides: Partial<StoryContent> = {},
): StoryContent {
  const base = cloneStoryContent(defaultHomeContent.about);

  return {
    ...base,
    ...overrides,
    features: overrides.features ?? base.features,
    stats: overrides.stats ?? base.stats,
  };
}

function paragraphsToRichText(paragraphs?: string[]) {
  if (!paragraphs?.length) {
    return "";
  }

  return paragraphs
    .map((paragraph) => {
      const trimmed = paragraph.trim();
      if (!trimmed) {
        return "";
      }

      return trimmed.startsWith("<") ? trimmed : `<p>${trimmed}</p>`;
    })
    .join("");
}

export interface MissionVisionContent {
  mission: {
    heading: string;
    text: string;
  };
  vision: {
    heading: string;
    text: string;
  };
}

export interface TeamMember {
  name: string;
  title: string;
  bio: string;
  image: string;
  imageAlt: string;
  specialties: string[];
}

export interface TeamContent {
  sectionLabel: string;
  heading: string;
  members: TeamMember[];
}

export interface ValueItem {
  icon: string;
  title: string;
  description: string;
}

export interface ValuesContent {
  sectionLabel: string;
  heading: string;
  subtitle: string;
  items: ValueItem[];
}

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsContent {
  stats: StatItem[];
}

export interface WhyChooseUsItem {
  number: string;
  title: string;
  description: string;
}

export interface WhyChooseUsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  items: WhyChooseUsItem[];
}

export interface CTAContent {
  heading: string;
  description: string;
  primaryButton: {
    label: string;
    phone: string;
  };
  secondaryButton: {
    label: string;
    sublabel: string;
    link: string;
  };
}

export interface AboutPageContent {
  hero: AboutHeroContent;
  story: StoryContent;
  missionVision: MissionVisionContent;
  team: TeamContent;
  values: ValuesContent;
  stats: StatsContent;
  whyChooseUs: WhyChooseUsContent;
  cta: CTAContent;
  headingTags?: Record<string, string>;
}

export const defaultAboutContent: AboutPageContent = {
  hero: createDefaultSharedHeroContent({
    h1Title: "– About Us",
    highlightedText: "Polaris digitalna rešenja",
    headline: "koja pretvaraju prisustvo u rezultate.",
    description:
      "Upoznajte tim, proces i principe koji stoje iza svakog sajta, SEO kampanje i digitalne strategije koju isporučujemo.",
    trustText1: "Strategija",
    trustText2: "Transparentnost",
    trustText3: "Rezultati",
    formTitle: "Započnimo razgovor",
    phoneLabel: "Pozovite nas",
  }),
  story: createDefaultAboutStoryContent({
    sectionLabel: "– O nama",
    heading: "Digitalni partner za rast vašeg biznisa",
    description:
      "<p>Polaris Development pomaže kompanijama širom Srbije i inostranstva kroz izradu modernih web sajtova, SEO optimizaciju i digitalni marketing strategije fokusirane na rezultate.</p><p>Gradimo prisustvo koje izgleda moderno, radi brzo i pretvara posete u konkretne upite i klijente.</p>",
    contactLabel: "Kontaktirajte nas",
    contactText: "Zakažite besplatne konsultacije",
    attorneyImage: "/images/team/attorney-2.png",
    attorneyImageAlt: "Polaris Development",
    features: [
      {
        number: "1",
        title: "Strategija usmerena na rezultate",
        description:
          "<p>Svaki projekat planiramo prema vašim poslovnim ciljevima, tržištu i korisnicima koje želite da privučete.</p>",
      },
      {
        number: "2",
        title: "Brzina, SEO i performanse",
        description:
          "<p>Spajamo moderan dizajn sa tehničkom optimizacijom kako bi sajt bio vidljiv, brz i spreman za rast.</p>",
      },
      {
        number: "3",
        title: "Partnerstvo, ne samo isporuka",
        description:
          "<p>Ne pravimo samo lepe stranice — pomažemo vam da izgradite digitalni sistem koji podržava prodaju i dugoročni razvoj.</p>",
      },
    ],
    stats: [
      { value: "2018", label: "Iskustvo sa američkim tržištem" },
      { value: "200+", label: "Projekata i kampanja" },
      { value: "98%", label: "Fokus na zadovoljstvo klijenata" },
      { value: "24/7", label: "Podrška i brz odgovor" },
    ],
  }),
  missionVision: {
    mission: {
      heading: "Our Mission",
      text: "To provide exceptional representation that empowers our clients, protects their rights, and delivers results. We are committed to being accessible, responsive, and relentless in pursuing the best outcomes for those we serve.",
    },
    vision: {
      heading: "Our Vision",
      text: "To be the most trusted and respected firm in the region, recognized for our unwavering integrity, excellence, and genuine care for our clients. We envision a community where everyone has access to quality service.",
    },
  },
  team: {
    sectionLabel: "– Our Team",
    heading: "Experienced Professionals Dedicated to Your Success",
    members: [
      {
        name: "Attorney Name",
        title: "Senior Partner",
        bio: "With over 20 years of experience, they have successfully served thousands of clients and achieved outstanding results.",
        image: "/images/team/team-member-1.png",
        imageAlt: "",
        specialties: ["Specialty 1", "Specialty 2", "Specialty 3"],
      },
      {
        name: "Attorney Name",
        title: "Managing Partner",
        bio: "A specialist with a proven track record of achieving results that others considered impossible.",
        image: "/images/team/team-member-1.png",
        imageAlt: "",
        specialties: ["Specialty 1", "Specialty 2", "Specialty 3"],
      },
      {
        name: "Attorney Name",
        title: "Senior Attorney",
        bio: "An expert who has helped countless clients receive the results they deserve.",
        image: "/images/team/team-member-1.png",
        imageAlt: "",
        specialties: ["Specialty 1", "Specialty 2", "Specialty 3"],
      },
    ],
  },
  values: {
    sectionLabel: "– Our Values",
    heading: "Principles That Guide Our Practice",
    subtitle: "",
    items: [
      {
        icon: "Scale",
        title: "Integrity",
        description:
          "We uphold the highest ethical standards in every case we handle. Your trust is our foundation, and we never compromise on honesty and transparency.",
      },
      {
        icon: "Award",
        title: "Excellence",
        description:
          "Our commitment to excellence drives us to thoroughly prepare every engagement, leverage cutting-edge strategies, and pursue the best possible outcomes.",
      },
      {
        icon: "Users",
        title: "Client-First Approach",
        description:
          "Your needs come first. We listen carefully, communicate clearly, and work tirelessly to protect your rights and achieve your goals.",
      },
      {
        icon: "Heart",
        title: "Compassion",
        description:
          "We understand that challenges often arise during difficult times. Our team provides not just expertise, but genuine care and support.",
      },
    ],
  },
  stats: {
    stats: [
      { value: "25+", label: "Years Combined Experience" },
      { value: "1000+", label: "Projects Successfully Handled" },
      { value: "$50M+", label: "Recovered for Clients" },
      { value: "98%", label: "Client Satisfaction Rate" },
    ],
  },
  whyChooseUs: {
    sectionLabel: "– Why Choose Us",
    heading: "What Sets Us Apart",
    description:
      "When you choose our firm, you're choosing a team that combines expertise with genuine care for your well-being. Here's what makes us different:",
    image: "/images/stock/team-photo.jpg",
    imageAlt: "Our professional team",
    items: [
      {
        number: "1",
        title: "Personalized Attention",
        description:
          "Every engagement receives individualized care. We take time to understand your unique situation and develop a tailored strategy.",
      },
      {
        number: "2",
        title: "Proven Track Record",
        description:
          "Our history of successful verdicts and settlements speaks for itself. We have the experience and skills to win.",
      },
      {
        number: "3",
        title: "24/7 Availability",
        description:
          "Emergencies don't wait for business hours. Our team is available around the clock to address your concerns.",
      },
      {
        number: "4",
        title: "No Win, No Fee",
        description:
          "We work on a contingency basis for most cases, meaning you pay nothing unless we win your case.",
      },
    ],
  },
  cta: {
    heading: "Ready to Get Started?",
    description: "Our experienced team is standing by to help you.",
    primaryButton: {
      label: "Call Us 24/7",
      phone: "",
    },
    secondaryButton: {
      label: "Schedule Now",
      sublabel: "Free Consultation",
      link: "/contact",
    },
  },
};

export function normalizeAboutStoryContent(
  value: unknown,
  fallbackStats?: StatItem[],
): StoryContent {
  const defaults = createDefaultAboutStoryContent(
    fallbackStats?.length ? { stats: fallbackStats } : {},
  );

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return defaults;
  }

  const story = value as LegacyStoryContent;
  const isHomepageShape =
    "description" in story ||
    "attorneyImage" in story ||
    "contactLabel" in story ||
    "features" in story ||
    "stats" in story;

  if (isHomepageShape) {
    return {
      ...defaults,
      ...story,
      features:
        Array.isArray(story.features) && story.features.length > 0
          ? story.features
          : defaults.features,
      stats:
        Array.isArray(story.stats) && story.stats.length > 0
          ? story.stats
          : defaults.stats,
    };
  }

  return {
    ...defaults,
    sectionLabel: story.sectionLabel ?? defaults.sectionLabel,
    heading: story.heading ?? defaults.heading,
    description: paragraphsToRichText(story.paragraphs) || defaults.description,
    attorneyImage: story.image ?? defaults.attorneyImage,
    attorneyImageAlt: story.imageAlt ?? defaults.attorneyImageAlt,
    stats: fallbackStats?.length ? fallbackStats : defaults.stats,
  };
}

export function normalizeAboutPageContent(
  value: Partial<AboutPageContent> | null | undefined,
): AboutPageContent {
  const cmsContent = value ?? {};
  const story = normalizeAboutStoryContent(
    cmsContent.story,
    cmsContent.stats?.stats?.length
      ? cmsContent.stats.stats
      : defaultAboutContent.story.stats,
  );

  return {
    ...defaultAboutContent,
    ...cmsContent,
    hero: normalizeSharedHeroContent(cmsContent.hero, defaultAboutContent.hero),
    story,
    missionVision: {
      mission: {
        ...defaultAboutContent.missionVision.mission,
        ...cmsContent.missionVision?.mission,
      },
      vision: {
        ...defaultAboutContent.missionVision.vision,
        ...cmsContent.missionVision?.vision,
      },
    },
    team: {
      ...defaultAboutContent.team,
      ...cmsContent.team,
      members: cmsContent.team?.members?.length
        ? cmsContent.team.members
        : defaultAboutContent.team.members,
    },
    values: {
      ...defaultAboutContent.values,
      ...cmsContent.values,
      items: cmsContent.values?.items?.length
        ? cmsContent.values.items
        : defaultAboutContent.values.items,
    },
    stats: {
      ...defaultAboutContent.stats,
      ...cmsContent.stats,
      stats: cmsContent.stats?.stats?.length
        ? cmsContent.stats.stats
        : story.stats,
    },
    whyChooseUs: {
      ...defaultAboutContent.whyChooseUs,
      ...cmsContent.whyChooseUs,
      items: cmsContent.whyChooseUs?.items?.length
        ? cmsContent.whyChooseUs.items
        : defaultAboutContent.whyChooseUs.items,
    },
    cta: {
      ...defaultAboutContent.cta,
      ...cmsContent.cta,
      primaryButton: {
        ...defaultAboutContent.cta.primaryButton,
        ...cmsContent.cta?.primaryButton,
      },
      secondaryButton: {
        ...defaultAboutContent.cta.secondaryButton,
        ...cmsContent.cta?.secondaryButton,
      },
    },
  };
}
