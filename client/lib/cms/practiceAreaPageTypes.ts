// Type definitions for individual Practice Area page content (e.g. /practice-areas/personal-injury)
// Each section maps directly to a static component's data needs

export interface PracticeAreaHeroContent {
  sectionLabel: string;
  tagline: string;
  description: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
}

export interface PracticeAreaTestimonialItem {
  text: string;
  author: string;
  ratingImage: string;
  ratingImageAlt?: string;
}

export interface PracticeAreaAwardsContent {
  logos: Array<{ src: string; alt: string }>;
}

export interface PracticeAreaSocialProofContent {
  mode: "testimonials" | "awards" | "none";
  testimonials: PracticeAreaTestimonialItem[];
  awards: PracticeAreaAwardsContent;
}

export interface PracticeAreaContentSectionItem {
  body: string;
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  /** Whether to show the CTA call-boxes (phone + contact). Defaults to true. */
  showCTAs?: boolean;
}

export interface PracticeAreaFaqContent {
  enabled: boolean;
  heading: string;
  description: string;
  items: Array<{ question: string; answer: string }>;
}

export interface PracticeAreaPageContent {
  hero: PracticeAreaHeroContent;
  socialProof: PracticeAreaSocialProofContent;
  contentSections: PracticeAreaContentSectionItem[];
  faq: PracticeAreaFaqContent;
  headingTags?: Record<string, string>;
}

// Default content — used as fallback when CMS content is not available
export const defaultPracticeAreaPageContent: PracticeAreaPageContent = {
  hero: {
    sectionLabel: "– Practice Area",
    tagline: "Experienced Legal Representation",
    description:
      "Our dedicated team of attorneys brings years of experience and a proven track record of success. We fight to protect your rights and pursue the justice you deserve.",
    backgroundImage: "",
  },
  socialProof: {
    mode: "awards",
    testimonials: [
      {
        text: "The attorneys were professional, compassionate, and fought tirelessly for my case. I couldn't have asked for better representation.",
        author: "Client",
        ratingImage: "/images/logos/rating-stars.png",
        ratingImageAlt: "5 star rating",
      },
      {
        text: "From the first consultation to the final verdict, the team kept me informed and confident. Highly recommend their services.",
        author: "Client",
        ratingImage: "/images/logos/rating-stars.png",
        ratingImageAlt: "5 star rating",
      },
      {
        text: "They exceeded my expectations in every way. Their dedication to my case was evident throughout the entire process.",
        author: "Client",
        ratingImage: "/images/logos/rating-stars.png",
        ratingImageAlt: "5 star rating",
      },
    ],
    awards: {
      logos: [
        { src: "/images/awards/award-1.png", alt: "Award" },
        { src: "/images/awards/award-2.png", alt: "Award" },
        { src: "/images/awards/award-3.png", alt: "Award" },
        { src: "/images/awards/award-4.png", alt: "Award" },
        { src: "/images/awards/award-5.png", alt: "Award" },
        { src: "/images/awards/award-6.png", alt: "Award" },
      ],
    },
  },
  contentSections: [
    {
      body: "<p>Our attorneys have extensive experience handling cases in this practice area. We understand the complexities of the law and work diligently to build a strong case on your behalf.</p><p>Whether you're dealing with a minor issue or a complex legal matter, we provide personalized attention and aggressive representation to ensure the best possible outcome.</p>",
      image: "/images/stock/lawyer-consulting.jpg",
      imageAlt: "Attorney consulting with client",
      imagePosition: "right",
    },
  ],
  faq: {
    enabled: true,
    heading: "Frequently Asked Questions",
    description:
      "Find answers to common questions about this practice area below.",
    items: [
      {
        question: "How much does a consultation cost?",
        answer:
          "We offer free initial consultations. There is no obligation and no cost to discuss your case with one of our experienced attorneys.",
      },
      {
        question: "How long will my case take?",
        answer:
          "Every case is unique, and the timeline can vary depending on the complexity of your situation. During your consultation, we'll provide a realistic assessment of the expected timeline.",
      },
      {
        question: "What if I can't afford an attorney?",
        answer:
          "We work on a contingency fee basis for most cases, which means you don't pay unless we win. Our goal is to make quality legal representation accessible to everyone.",
      },
    ],
  },
};
