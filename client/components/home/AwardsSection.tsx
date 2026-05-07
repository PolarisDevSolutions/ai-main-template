import type { AwardsContent } from "@/lib/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface AwardsSectionProps {
  content?: AwardsContent;
}

const defaultContent: AwardsContent = {
  sectionLabel: "– Achievements",
  heading: "Awards & Membership",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  logos: [
    { src: "/images/awards/award-1.png", alt: "Award Logo" },
    { src: "/images/awards/award-2.png", alt: "Award Logo" },
    { src: "/images/awards/award-3.png", alt: "Award Logo" },
    { src: "/images/awards/award-4.png", alt: "Award Logo" },
    { src: "/images/awards/award-5.png", alt: "Award Logo" },
    { src: "/images/awards/award-6.png", alt: "Award Logo" },
    { src: "/images/awards/forbes.png", alt: "Forbes" },
    { src: "/images/awards/lc-logo.png", alt: "LC Logo" },
  ],
};

export default function AwardsSection({ content }: AwardsSectionProps) {
  const data = content || defaultContent;
  const logos = data.logos?.length ? data.logos : defaultContent.logos;
  const doubledLogos = [...logos, ...logos];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-14">
          {data.sectionLabel && (
            <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
              {data.sectionLabel}
            </p>
          )}
          <h2 className="font-grotesk text-[clamp(1.8rem,4vw,44px)] font-light leading-[1.15] text-brand-dark mb-4">
            {data.heading}
          </h2>
          {data.description && (
            <RichText
              html={data.description}
              className="font-manrope text-[15px] leading-relaxed text-brand-dark/60 max-w-2xl mx-auto"
            />
          )}
        </AnimatedSection>
      </div>

      {/* Full-width marquee strip */}
      <div className="w-full overflow-hidden border-y border-brand-dark/8 py-8">
        <div
          className="flex animate-marquee whitespace-nowrap"
          style={{ width: "max-content" }}
        >
          {doubledLogos.map((logo, index) => (
            <div
              key={index}
              className="inline-flex items-center justify-center px-10 shrink-0"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={80}
                loading="lazy"
                className="h-[64px] w-auto object-contain opacity-50 hover:opacity-80 transition-opacity duration-200 grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
