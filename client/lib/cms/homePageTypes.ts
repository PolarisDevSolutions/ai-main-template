import {
  createDefaultSharedHeroContent,
  type SharedHeroContent,
} from "./sharedHero";

export interface HeroFormContent {
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  consentBefore: string;
  privacyLabel: string;
  privacyLink: string;
  consentAfter: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  requiredMessage: string;
  emailMessage: string;
}

export type HeroContent = SharedHeroContent & {
  tagline: string;
  form: HeroFormContent;
};

export interface PartnerLogo {
  src: string;
  alt: string;
}

export interface AboutFeature {
  number: string;
  title: string;
  description: string;
}

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  contactLabel: string;
  contactText: string;
  contactLink?: string;
  attorneyImage: string;
  attorneyImageAlt: string;
  features: AboutFeature[];
  stats: AboutStat[];
}

export interface PracticeAreaItem {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  link: string;
  linkLabel?: string;
}

export interface PracticeAreasIntroContent {
  sectionLabel: string;
  heading: string;
  description: string;
  buttonEyebrow: string;
  buttonLabel: string;
  buttonLink: string;
}

export interface ServicesOutroContent {
  text: string;
}

export interface WhyNeedUsCard {
  title: string;
  description: string;
}

export interface WhyNeedUsContent {
  heading: string;
  intro: string;
  buttonLabel: string;
  buttonLink: string;
  cards: WhyNeedUsCard[];
  closingParagraph: string;
}

export interface TestimonialItem {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface TestimonialsContent {
  sectionLabel: string;
  heading: string;
  backgroundImage: string;
  backgroundImageAlt?: string;
  items: TestimonialItem[];
}

export interface FeaturedProject {
  name: string;
  industry: string;
  goal: string;
  work: string;
  image: string;
  imageAlt: string;
  link: string;
  result: string;
  measurementPeriod: string;
}

export interface FeaturedProjectsContent {
  enabled: boolean;
  sectionLabel: string;
  heading: string;
  projects: FeaturedProject[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionLabel: string;
  headingLine1: string;
  headingLine2: string;
  steps: ProcessStep[];
}

export interface GoogleReviewItem {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
  sourceUrl?: string;
}

export interface GoogleReviewsContent {
  sectionLabel: string;
  heading: string;
  description: string;
  reviews: GoogleReviewItem[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  heading: string;
  description: string;
  items: FaqItem[];
}

export interface ContactFormContent {
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  websitePlaceholder: string;
  projectPlaceholder: string;
  consentBefore: string;
  privacyLabel: string;
  privacyLink: string;
  consentAfter: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  errorMessage: string;
  requiredMessage: string;
  emailMessage: string;
}

export interface ContactContent {
  sectionLabel: string;
  heading: string;
  description: string;
  phone: string;
  phoneLabel: string;
  address: string;
  formHeading: string;
  image: string;
  imageAlt: string;
  form: ContactFormContent;
}

export interface HomePageContent {
  hero: HeroContent;
  partnerLogosTitle: string;
  partnerLogos: PartnerLogo[];
  about: AboutContent;
  practiceAreasIntro: PracticeAreasIntroContent;
  practiceAreas: PracticeAreaItem[];
  servicesOutro: ServicesOutroContent;
  whyNeedUs: WhyNeedUsContent;
  testimonials: TestimonialsContent;
  featuredProjects: FeaturedProjectsContent;
  process: ProcessContent;
  googleReviews: GoogleReviewsContent;
  faq: FaqContent;
  contact: ContactContent;
  headingTags?: Record<string, string>;
}

const emptyHeroForm: HeroFormContent = {
  firstNamePlaceholder: "",
  lastNamePlaceholder: "",
  emailPlaceholder: "",
  phonePlaceholder: "",
  consentBefore: "",
  privacyLabel: "",
  privacyLink: "",
  consentAfter: "",
  submitLabel: "",
  submittingLabel: "",
  successMessage: "",
  errorMessage: "",
  requiredMessage: "",
  emailMessage: "",
};

const emptyContactForm: ContactFormContent = {
  firstNamePlaceholder: "",
  lastNamePlaceholder: "",
  emailPlaceholder: "",
  phonePlaceholder: "",
  websitePlaceholder: "",
  projectPlaceholder: "",
  consentBefore: "",
  privacyLabel: "",
  privacyLink: "",
  consentAfter: "",
  submitLabel: "",
  submittingLabel: "",
  successMessage: "",
  errorMessage: "",
  requiredMessage: "",
  emailMessage: "",
};

export const defaultHomeContent: HomePageContent = {
  hero: {
    ...createDefaultSharedHeroContent({ formTitle: "", phoneLabel: "" }),
    tagline: "",
    form: emptyHeroForm,
  },
  partnerLogosTitle: "",
  partnerLogos: [],
  about: {
    sectionLabel: "",
    heading: "",
    description: "",
    phone: "",
    phoneLabel: "",
    contactLabel: "",
    contactText: "",
    contactLink: "",
    attorneyImage: "",
    attorneyImageAlt: "",
    features: [],
    stats: [],
  },
  practiceAreasIntro: {
    sectionLabel: "",
    heading: "",
    description: "",
    buttonEyebrow: "",
    buttonLabel: "",
    buttonLink: "",
  },
  practiceAreas: [],
  servicesOutro: { text: "" },
  whyNeedUs: {
    heading: "",
    intro: "",
    buttonLabel: "",
    buttonLink: "",
    cards: [],
    closingParagraph: "",
  },
  testimonials: {
    sectionLabel: "",
    heading: "",
    backgroundImage: "",
    backgroundImageAlt: "",
    items: [],
  },
  featuredProjects: {
    enabled: false,
    sectionLabel: "",
    heading: "",
    projects: [],
  },
  process: {
    sectionLabel: "",
    headingLine1: "",
    headingLine2: "",
    steps: [],
  },
  googleReviews: {
    sectionLabel: "",
    heading: "",
    description: "",
    reviews: [],
  },
  faq: {
    heading: "",
    description: "",
    items: [],
  },
  contact: {
    sectionLabel: "",
    heading: "",
    description: "",
    phone: "",
    phoneLabel: "",
    address: "",
    formHeading: "",
    image: "",
    imageAlt: "",
    form: emptyContactForm,
  },
};
