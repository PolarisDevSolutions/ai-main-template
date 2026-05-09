// Type definitions for structured Practice Areas page content
import {
  createDefaultSharedHeroContent,
  type SharedHeroContent,
} from "./sharedHero";

// Each section maps directly to a static component's data needs

export type PracticeAreasHeroContent = SharedHeroContent;

export interface PracticeAreaGridItem {
  icon: string; // Lucide icon name
  title: string; // "Personal Injury"
  description: string; // Description text
  image: string; // Background image URL
  imageAlt: string; // Image alt text
  link: string; // Link to detail page
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
  grid: PracticeAreasGridContent;
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
  grid: {
    heading: "Our Areas of Practice",
    description:
      "Select a practice area to learn more about how our attorneys can help with your specific legal needs.",
    areas: [],
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
