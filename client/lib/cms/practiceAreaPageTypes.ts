// Type definitions for individual Practice Area page content (e.g. /practice-areas/personal-injury)
import {
  createDefaultSharedHeroContent,
  type SharedHeroContent,
} from "./sharedHero";

// Each section maps directly to a static component's data needs

export type PracticeAreaHeroContent = SharedHeroContent;

export interface PracticeAreaTestimonialItem {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface PracticeAreaAwardsContent {
  heading: string;
  logos: Array<{ src: string; alt: string }>;
}

export interface PracticeAreaSocialProofContent {
  mode: "testimonials" | "awards" | "none";
  testimonials: PracticeAreaTestimonialItem[];
  awards: PracticeAreaAwardsContent;
}

export interface PracticeAreaContentSectionItem {
  label: string;
  heading: string;
  body: string;
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  theme: "light" | "dark";
  showCTAs?: boolean;
}

export interface PracticeAreaFaqContent {
  enabled: boolean;
  heading: string;
  description: string;
  items: Array<{ question: string; answer: string }>;
}

export interface PracticeAreaCtaContent {
  primaryLabel: string;
  secondaryLabel: string;
  secondarySublabel: string;
  secondaryLink: string;
}

export interface PracticeAreaPageContent {
  hero: PracticeAreaHeroContent;
  socialProof: PracticeAreaSocialProofContent;
  contentSections: PracticeAreaContentSectionItem[];
  faq: PracticeAreaFaqContent;
  cta: PracticeAreaCtaContent;
  headingTags?: Record<string, string>;
}

// Default content — used as fallback when CMS content is not available
export const defaultPracticeAreaPageContent: PracticeAreaPageContent = {
  hero: createDefaultSharedHeroContent({
    h1Title: "– Usluga",
    highlightedText: "Prilagođeno rešenje",
    headline: "za vaš sledeći korak.",
    description:
      "Svaka usluga ima drugačiji proces, prioritete i ciljeve. Ova stranica objašnjava šta dobijate, kako radimo i kako izgleda saradnja.",
    trustText1: "Analiza",
    trustText2: "Implementacija",
    trustText3: "Optimizacija",
    formTitle: "Pošaljite upit",
    phoneLabel: "Pozovite nas",
  }),
  socialProof: {
    mode: "none",
    testimonials: [],
    awards: {
      heading: "Tehnologije i platforme koje koristimo",
      logos: [],
    },
  },
  contentSections: [
    {
      label: "– O usluzi",
      heading: "Rešenje prilagođeno ciljevima vašeg biznisa",
      body: "<p>Opišite uslugu, proces rada i rezultate koje klijent može da očekuje.</p>",
      image: "",
      imageAlt: "",
      imagePosition: "right",
      theme: "light",
      showCTAs: true,
    },
  ],
  faq: {
    enabled: true,
    heading: "Često postavljana pitanja",
    description: "Odgovori na najčešća pitanja o usluzi i procesu saradnje.",
    items: [
      {
        question: "Kako izgleda početak saradnje?",
        answer: "<p>Saradnja počinje analizom potreba, ciljeva i trenutnog online nastupa.</p>",
      },
    ],
  },
  cta: {
    primaryLabel: "Pozovite nas",
    secondaryLabel: "Pošaljite upit",
    secondarySublabel: "Zakažite konsultacije",
    secondaryLink: "/kontakt/",
  },
};
