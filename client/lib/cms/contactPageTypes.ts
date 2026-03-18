// Type definitions for structured Contact page content
// Each section maps directly to a static component's data needs

export interface ContactHeroContent {
  sectionLabel: string; // "– Contact Us" (H1)
  tagline: string; // "Let's Talk About Your Case" (styled paragraph)
  description: string; // Description paragraph
}

export interface ContactMethodItem {
  icon: string; // Lucide icon name
  title: string; // "Phone", "Email", "Office"
  detail: string; // Primary detail (phone number, email, address line 1)
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

export interface ProcessStepItem {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  sectionLabel: string; // "– The Process"
  heading: string; // "What to Expect When You Contact Us"
  subtitle: string; // Subtitle text
  steps: ProcessStepItem[];
}

export interface VisitOfficeContent {
  heading: string; // "Visit Our Office"
  subtext: string; // Description text
  mapEmbedUrl: string; // Google Maps embed URL
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
  contactMethods: ContactMethodsContent;
  form: ContactFormContent;
  officeHours: OfficeHoursContent;
  process: ProcessContent;
  visitOffice: VisitOfficeContent;
  cta: CTAContent;
  /** Maps heading keys (e.g. "form.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - used as fallback when CMS content is not available
export const defaultContactContent: ContactPageContent = {
  hero: {
    sectionLabel: "– Contact Us",
    tagline: "Let's Talk About Your Case",
    description:
      "Our team is ready to listen, answer your questions, and provide the expert legal guidance you need. Contact us today for a free consultation.",
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
  process: {
    sectionLabel: "– The Process",
    heading: "What to Expect When You Contact Us",
    subtitle: "",
    steps: [
      {
        number: "1",
        title: "Contact Us",
        description:
          "Reach out via phone, email, or our contact form. Our intake team is available 24/7 to take your call.",
      },
      {
        number: "2",
        title: "Free Consultation",
        description:
          "Schedule a no-obligation consultation where we'll review your case, answer questions, and explain your legal options.",
      },
      {
        number: "3",
        title: "Case Evaluation",
        description:
          "Our experienced attorneys will thoroughly evaluate your case and develop a strategic plan tailored to your needs.",
      },
      {
        number: "4",
        title: "Take Action",
        description:
          "Once you decide to work with us, we immediately begin building your case and fighting for the compensation you deserve.",
      },
    ],
  },
  visitOffice: {
    heading: "Visit Our Office",
    subtext:
      "Our office is conveniently located and easily accessible.",
    mapEmbedUrl: "",
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
      link: "/contact",
    },
  },
};
