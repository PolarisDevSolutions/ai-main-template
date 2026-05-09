// Type definitions for structured About page content
import {
  createDefaultSharedHeroContent,
  type SharedHeroContent,
} from "./sharedHero";

// Each section maps directly to a static component's data needs

export type AboutHeroContent = SharedHeroContent;

export interface StoryContent {
  sectionLabel: string; // "– Our Story"
  heading: string; // "Building Trust Since 1999"
  paragraphs: string[]; // Array of paragraph texts
  image: string;
  imageAlt: string;
}

export interface MissionVisionContent {
  mission: {
    heading: string; // "Our Mission"
    text: string; // Mission paragraph
  };
  vision: {
    heading: string; // "Our Vision"
    text: string; // Vision paragraph
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
  sectionLabel: string; // "– Our Legal Team"
  heading: string; // "Experienced Attorneys..."
  members: TeamMember[];
}

export interface ValueItem {
  icon: string; // Lucide icon name
  title: string;
  description: string;
}

export interface ValuesContent {
  sectionLabel: string; // "– Our Values"
  heading: string; // "Principles That Guide Our Practice"
  subtitle: string; // Subtitle text (NEW)
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
  sectionLabel: string; // "– Why Choose Us"
  heading: string; // "What Sets Us Apart"
  description: string; // Intro paragraph
  image: string; // Section image
  imageAlt: string; // Image alt text
  items: WhyChooseUsItem[];
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

// Complete About page content structure
export interface AboutPageContent {
  hero: AboutHeroContent;
  story: StoryContent;
  missionVision: MissionVisionContent;
  team: TeamContent;
  values: ValuesContent;
  stats: StatsContent;
  whyChooseUs: WhyChooseUsContent;
  cta: CTAContent;
  /** Maps heading keys (e.g. "story.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - used as fallback when CMS content is not available
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
  story: {
    sectionLabel: "– Our Story",
    heading: "Building Trust Since 1999",
    paragraphs: [
      "Our firm was founded on a simple but powerful principle: every person deserves access to exceptional representation, regardless of their circumstances.",
      "What started as a small practice has grown into one of the region's most respected firms, but our core values remain unchanged. We still treat every client like family and fight for their rights with unwavering dedication.",
      "Today, our team of experienced professionals continues to set new standards for excellence in our community.",
    ],
    image: "/images/team/attorney-2.png",
    imageAlt: "Our Firm",
  },
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
        specialties: [
          "Specialty 1",
          "Specialty 2",
          "Specialty 3",
        ],
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
        specialties: [
          "Specialty 1",
          "Specialty 2",
          "Specialty 3",
        ],
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
