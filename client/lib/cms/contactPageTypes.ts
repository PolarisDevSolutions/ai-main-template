// Type definitions for structured Contact page content
import {
  createDefaultSharedHeroContent,
  type SharedHeroContent,
} from "./sharedHero";

// Each section maps directly to a static component's data needs

export type ContactHeroContent = SharedHeroContent;

export interface ContactIntroContent {
  title: string;
  content: string;
}

export interface ContactMethodItem {
  icon: string; // Lucide icon name
  title: string; // "Phone", "Email", "Office"
  detail: string; // Primary detail (phone number or address line 1)
  email?: string; // Email address for the email card
  subDetail: string; // Secondary detail (availability, response time, address line 2)
}

export interface ContactMethodsContent {
  methods: ContactMethodItem[];
}

export interface ContactFormContent {
  heading: string; // "Send Us a Message"
  subtext: string; // Description below heading
}

export interface OfficeHoursItem {
  day: string;
  hours: string;
}

export interface OfficeHoursContent {
  heading: string; // "Office Hours"
  items: OfficeHoursItem[];
  note: string; // Additional note
}

export interface CTAContent {
  heading: string; // "Ready to Discuss Your Case?"
  description: string; // Subtitle text
  primaryButton: {
    label: string; // "Call Us Now"
    phone: string; // Phone number
  };
  secondaryButton: {
    label: string; // "Schedule Consultation"
    sublabel: string; // "Free Case Review"
    link: string; // Link URL
  };
}

// Complete Contact page content structure
export interface ContactPageContent {
  hero: ContactHeroContent;
  intro: ContactIntroContent;
  contactMethods: ContactMethodsContent;
  form: ContactFormContent;
  officeHours: OfficeHoursContent;
  cta: CTAContent;
  /** Maps heading keys (e.g. "form.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - used as fallback when CMS content is not available
export const defaultContactContent: ContactPageContent = {
  hero: createDefaultSharedHeroContent({
    h1Title: "– Kontakt",
    highlightedText: "Recite nam",
    headline: "šta želite da izgradimo.",
    description:
      "Pošaljite nam detalje projekta i dobićete jasan predlog narednih koraka, procenu obima i preporuku digitalnog pravca.",
    trustText1: "Brz odgovor",
    trustText2: "Jasan proces",
    trustText3: "Bez obaveze",
    formTitle: "Pošaljite detalje projekta",
    phoneLabel: "Pozovite nas",
  }),
  intro: {
    title: "Recite nam više o projektu",
    content:
      "<p>Podelite sa nama šta želite da izgradite, unapredite ili pokrenete i dobićete jasan predlog sledećih koraka, preporuku usluga i okvir saradnje.</p>",
  },
  contactMethods: {
    methods: [
      {
        icon: "Phone",
        title: "Phone",
        detail: "",
        subDetail: "Available 24/7",
      },
      {
        icon: "Mail",
        title: "Email",
        detail: "",
        email: "",
        subDetail: "We respond within 24 hours",
      },
      {
        icon: "MapPin",
        title: "Office",
        detail: "",
        subDetail: "",
      },
    ],
  },
  form: {
    heading: "Send Us a Message",
    subtext:
      "Fill out the form below and we'll get back to you as soon as possible.",
  },
  officeHours: {
    heading: "Office Hours",
    items: [
      { day: "Monday - Friday", hours: "24/7 Available" },
      { day: "Saturday - Sunday", hours: "24/7 Available" },
      { day: "Holidays", hours: "24/7 Available" },
    ],
    note: "Our intake team is available 24 hours a day, seven days a week. We understand that legal emergencies don't follow a schedule.",
  },
  cta: {
    heading: "Ready to Discuss Your Case?",
    description: "Our experienced legal team is standing by to help you.",
    primaryButton: {
      label: "Call Us Now",
      phone: "",
    },
    secondaryButton: {
      label: "Schedule Consultation",
      sublabel: "Free Case Review",
      link: "/kontakt/",
    },
  },
};
