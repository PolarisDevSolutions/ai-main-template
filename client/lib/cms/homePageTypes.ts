// Type definitions for structured homepage content
// Each section maps directly to a static component's data needs

export interface HeroContent {
  h1Title: string; // H1 title text (all caps, ~20px) above the main hero headline
  highlightedText: string;
  headline: string;
  description: string;
  trustText1: string;
  trustText2: string;
  trustText3: string;
  formTitle: string;
  phone: string;
  phoneLabel: string;
}

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
}

export interface PracticeAreasIntroContent {
  sectionLabel: string;
  heading: string;
  buttonLink: string;
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
}

// Complete homepage content structure
export interface HomePageContent {
  hero: HeroContent;
  partnerLogosTitle: string;
  partnerLogos: PartnerLogo[];
  about: AboutContent;
  practiceAreasIntro: PracticeAreasIntroContent;
  practiceAreas: PracticeAreaItem[];
  whyNeedUs: WhyNeedUsContent;
  testimonials: TestimonialsContent;
  process: ProcessContent;
  googleReviews: GoogleReviewsContent;
  faq: FaqContent;
  contact: ContactContent;
  /** Maps heading keys (e.g. "about.heading") to HTML tag names (e.g. "h2") */
  headingTags?: Record<string, string>;
}

// Default content - used as fallback when CMS content is not available
export const defaultHomeContent: HomePageContent = {
  hero: {
    h1Title: "YOUR FIRM HEADLINE",
    highlightedText: "Polaris digitalna rešenja",
    headline: "za rast, vidljivost i konverzije.",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    trustText1: "Brz odgovor",
    trustText2: "SEO optimizacija",
    trustText3: "Moderni dizajn",
    formTitle: "Pošaljite upit",
    phone: "",
    phoneLabel: "Call Us 24/7",
  },
  partnerLogosTitle: "",
  partnerLogos: [
    { src: "/images/logos/partner-1.png", alt: "Partner Logo" },
    { src: "/images/logos/partner-2.png", alt: "Partner Logo" },
    { src: "/images/logos/partner-3.png", alt: "Partner Logo" },
  ],
  about: {
    sectionLabel: "– About Us",
    heading: "About Our Business",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
    phone: "",
    phoneLabel: "Call Us 24/7",
    contactLabel: "Contact Us",
    contactText: "For a Free Consultation",
    attorneyImage: "/images/team/team-member-1.png",
    attorneyImageAlt: "Team Member",
    features: [
      {
        number: "1",
        title: "Nationwide Representation",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue tincidunt, rhoncus lacus a, congue diam.",
      },
      {
        number: "2",
        title: "Understanding Your Case",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue tincidunt, rhoncus lacus a, congue diam.",
      },
      {
        number: "3",
        title: "Seeking Compensation",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue tincidunt, rhoncus lacus a, congue diam.",
      },
    ],
    stats: [
      { value: "1000+", label: "Trusted Clients Served" },
      { value: "$50 Million", label: "Recovered in Legal Dispute Settlements" },
      { value: "98%", label: "Client Satisfaction Rate" },
      { value: "150+", label: "Legal Professionals Available 24/7" },
    ],
  },
  practiceAreasIntro: {
    sectionLabel: "– Practice Areas",
    heading: "Practice Areas",
    buttonLink: "/practice-areas/",
  },
  practiceAreas: [],
  whyNeedUs: {
    heading: "Zašto vam je potreban pravi partner za rast",
    intro:
      "<p>Ovaj prostor je namenjen kratkom uvodu od jednog ili dva pasusa koji objašnjava zašto klijenti biraju vaš tim.</p><p>Možete dodati jasan kontekst, diferencijatore i razlog zbog kog je vaša podrška važna za njihov sledeći korak.</p>",
    buttonLabel: "Zakažite konsultacije",
    buttonLink: "/kontakt/",
    cards: [
      { title: "Strategija", description: "Kratak opis ključne vrednosti ili koristi koju pružate." },
      { title: "Performanse", description: "Kratak opis ključne vrednosti ili koristi koju pružate." },
      { title: "SEO pristup", description: "Kratak opis ključne vrednosti ili koristi koju pružate." },
      { title: "Kreativa", description: "Kratak opis ključne vrednosti ili koristi koju pružate." },
      { title: "Podrška", description: "Kratak opis ključne vrednosti ili koristi koju pružate." },
      { title: "Rezultati", description: "Kratak opis ključne vrednosti ili koristi koju pružate." },
    ],
    closingParagraph:
      "<p>Ovaj završni pasus možete iskoristiti za dodatno pojašnjenje, zaključak ili kratki poziv na akciju koji zatvara sekciju.</p>",
  },
  testimonials: {
    sectionLabel: "– Testimonials",
    heading: "Inspiring client success stories that drive change.",
    backgroundImage: "/images/backgrounds/testimonials-bg.jpg",
    backgroundImageAlt: "Testimonials background",
    items: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Sharon",
        ratingImage: "/images/logos/rating-stars.png",
        ratingImageAlt: "5 star rating",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Sharon",
        ratingImage: "/images/logos/rating-stars.png",
        ratingImageAlt: "5 star rating",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Sharon",
        ratingImage: "/images/logos/rating-stars.png",
        ratingImageAlt: "5 star rating",
      },
    ],
  },
  process: {
    sectionLabel: "– Process",
    headingLine1: "Get Started Easily.",
    headingLine2: "Take a Look at The Steps",
    steps: [
      {
        number: "01",
        title: "Step 1",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      },
      {
        number: "02",
        title: "Step 2",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      },
      {
        number: "03",
        title: "Step 3",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      },
    ],
  },
  googleReviews: {
    sectionLabel: "– Google Reviews",
    heading: "Real Voices, Real Trust: Our Google Reviews",
    description:
      "Our clients share their stories and insights about working with us. Dive into their experiences to understand how we prioritize your success.",
    reviews: [
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Lorem Ipsum",
        ratingImage: "",
        ratingImageAlt: "Rating",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Lorem Ipsum",
        ratingImage: "",
        ratingImageAlt: "Rating",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Lorem Ipsum",
        ratingImage: "",
        ratingImageAlt: "Rating",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Lorem Ipsum",
        ratingImage: "",
        ratingImageAlt: "Rating",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Lorem Ipsum",
        ratingImage: "",
        ratingImageAlt: "Rating",
      },
      {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
        author: "Lorem Ipsum",
        ratingImage: "",
        ratingImageAlt: "Rating",
      },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions",
    description:
      "Aenean porta erat id urna porttitor scelerisque. Aliquam vitae auctor nunc.",
    items: [
      {
        question: "This is an example FAQ",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      },
      {
        question: "This is an example FAQ",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      },
      {
        question: "This is an example FAQ",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      },
      {
        question: "This is an example FAQ",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
      },
    ],
  },
  contact: {
    sectionLabel: "– Contact",
    heading: "Get in Touch",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    phone: "",
    phoneLabel: "Call Us 24/7",
    address: "",
    formHeading: "Send Us a Message",
    image: "/images/team/attorney-2.png",
    imageAlt: "Contact Us",
  },
};
