// Type definitions for structured Practice Areas page content
import {
  createDefaultSharedHeroContent,
  type SharedHeroContent,
} from "./sharedHero";
import { defaultHomeContent, type AboutContent } from "./homePageTypes";

// Each section maps directly to a static component's data needs

export type PracticeAreasHeroContent = SharedHeroContent;

export interface PracticeAreasIntroContent {
  title: string;
  content: string;
}

export type PracticeAreasAboutSectionContent = Omit<AboutContent, "stats">;

function cloneAboutContent(
  content: AboutContent,
): PracticeAreasAboutSectionContent {
  return {
    sectionLabel: content.sectionLabel,
    heading: content.heading,
    description: content.description,
    phone: content.phone,
    phoneLabel: content.phoneLabel,
    contactLabel: content.contactLabel,
    contactText: content.contactText,
    attorneyImage: content.attorneyImage,
    attorneyImageAlt: content.attorneyImageAlt,
    features: content.features.map((feature) => ({ ...feature })),
  };
}

export function createDefaultPracticeAreasAboutContent(
  overrides: Partial<PracticeAreasAboutSectionContent> = {},
): PracticeAreasAboutSectionContent {
  const base = cloneAboutContent(defaultHomeContent.about);

  return {
    ...base,
    ...overrides,
    features: overrides.features ?? base.features,
  };
}

export interface PracticeAreaGridItem {
  icon: string; // Lucide icon name
  title: string; // "Personal Injury"
  description: string; // Description text
  image: string; // Background image URL
  imageAlt: string; // Image alt text
  link: string; // Link to detail page
  linkLabel: string;
}

export interface PracticeAreasGridContent {
  heading: string; // "Our Areas of Practice"
  description: string; // Intro paragraph
  areas: PracticeAreaGridItem[];
}

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
}

export interface WhyChooseContent {
  sectionLabel: string; // "– Why Choose Us"
  heading: string; // "Experience Across All Practice Areas"
  subtitle: string; // Subtitle text
  description: string; // Description paragraph
  image: string; // Section image (shared from About page)
  imageAlt: string; // Image alt text
  items: WhyChooseItem[];
}

export interface CTAContent {
  heading: string; // "Ready to Discuss Your Case?"
  description: string; // Subtitle text
  primaryButton: {
    label: string; // "Call Us 24/7"
    phone: string; // Phone number
  };
  secondaryButton: {
    label: string; // "Schedule Now"
    sublabel: string; // "Free Consultation"
    link: string; // Link URL
  };
}

// Complete Practice Areas page content structure
export interface PracticeAreasPageContent {
  hero: PracticeAreasHeroContent;
  intro: PracticeAreasIntroContent;
  grid: PracticeAreasGridContent;
  aboutSection: PracticeAreasAboutSectionContent;
  outro: PracticeAreasIntroContent;
  whyChoose: WhyChooseContent;
  cta: CTAContent;
  /** Maps heading keys (e.g. "grid.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - used as fallback when CMS content is not available
export const defaultPracticeAreasContent: PracticeAreasPageContent = {
  hero: createDefaultSharedHeroContent({
    h1Title: "– Usluge",
    highlightedText: "Sve što vam je",
    headline: "potrebno za digitalni rast.",
    description:
      "Od izrade sajtova i SEO optimizacije do oglasa i održavanja, ovde možete pregledati usluge kroz koje pomažemo brendovima da rastu.",
    trustText1: "Web sajtovi",
    trustText2: "SEO",
    trustText3: "Marketing",
    formTitle: "Zatražite ponudu",
    phoneLabel: "Pozovite nas",
  }),
  intro: {
    title: "Rešenja prilagođena vašem rastu",
    content:
      "<p>Bez obzira da li vam je potreban novi sajt, bolja vidljivost na Google-u ili održavanje postojećeg digitalnog prisustva, naše usluge su osmišljene tako da podrže stvarne poslovne ciljeve.</p>",
  },
  grid: {
    heading: "Our Areas of Practice",
    description:
      "Select a practice area to learn more about how our attorneys can help with your specific legal needs.",
    areas: [],
  },
  aboutSection: createDefaultPracticeAreasAboutContent({
    sectionLabel: "– Zašto Polaris",
    heading: "Podrška koja spaja strategiju, izvedbu i rast",
    description:
      "<p>Svaku uslugu gradimo tako da odgovara vašem trenutnom cilju — od novog sajta i SEO optimizacije do dugoročnog održavanja i marketinške podrške.</p><p>Ne nudimo generička rešenja, već digitalne sisteme koji izgledaju profesionalno, rade brzo i pomažu vam da dođete do više pravih upita.</p>",
    contactLabel: "Kontaktirajte nas",
    contactText: "Zakažite besplatne konsultacije",
    attorneyImage: "/images/team/attorney-2.png",
    attorneyImageAlt: "Polaris Development usluge",
    features: [
      {
        number: "1",
        title: "Jasna strategija usluga",
        description:
          "<p>Pomažemo vam da odaberete pravi miks usluga prema fazi poslovanja, ciljevima i tržištu na kome nastupate.</p>",
      },
      {
        number: "2",
        title: "Fokus na performanse",
        description:
          "<p>Svako rešenje postavljamo tako da podrži brzinu, SEO, korisničko iskustvo i dugoročni rast vaše digitalne prisutnosti.</p>",
      },
      {
        number: "3",
        title: "Partnerstvo kroz ceo proces",
        description:
          "<p>Od prve ideje do optimizacije nakon lansiranja, ostajemo uključeni kako bi usluga donosila stvarne rezultate.</p>",
      },
    ],
  }),
  outro: {
    title: "Spremni za sledeći korak?",
    content:
      "<p>Ovde možete dodati završni tekst koji povezuje usluge, vaš pristup i poziv korisniku da vas kontaktira ili istraži sledeći korak.</p>",
  },
  whyChoose: {
    sectionLabel: "– Why Choose Us",
    heading: "Experience Across All Practice Areas",
    subtitle: "",
    image: "/images/stock/lawyer-consulting.jpg",
    imageAlt: "Why Choose Us",
    description:
      "No matter your legal challenge, our diverse team brings the specialized knowledge, resources, and dedication needed to achieve the best possible outcome for your case.",
    items: [
      {
        number: "1",
        title: "Specialized Expertise",
        description:
          "Each attorney on our team brings deep knowledge in their specific practice area, ensuring you receive expert guidance tailored to your case.",
      },
      {
        number: "2",
        title: "Proven Success Record",
        description:
          "Decades of successful verdicts and settlements across all practice areas. Our track record speaks to our ability to win.",
      },
      {
        number: "3",
        title: "Comprehensive Resources",
        description:
          "We invest in expert witnesses, investigators, and cutting-edge technology to build the strongest possible case for you.",
      },
      {
        number: "4",
        title: "Client-Centered Approach",
        description:
          "Your needs drive our strategy. We maintain open communication and keep you informed every step of the way.",
      },
    ],
  },
  cta: {
    heading: "Ready to Discuss Your Case?",
    description:
      "Get a free consultation with one of our experienced attorneys today.",
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
