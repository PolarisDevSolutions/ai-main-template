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
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
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
  const logos = data.logos || defaultContent.logos;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left Side - Text Content */}
        <AnimatedSection className="lg:w-[380px] shrink-0" direction="left">
          {data.sectionLabel && (
            <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
              {data.sectionLabel}
            </p>
          )}
          <h2 className="font-grotesk text-[clamp(1.8rem,4vw,44px)] font-light leading-[1.15] text-brand-dark mb-6">
            {data.heading}
          </h2>
          <RichText
            html={data.description}
            className="font-manrope text-[15px] leading-relaxed text-brand-dark/60"
          />
        </AnimatedSection>

        {/* Right Side - Logo Grid */}
        <AnimatedSection className="flex-1" delay={0.15}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {logos.map((logo, index) => (
              <div
                key={index}
                className="bg-[#f5f5f5] flex items-center justify-center p-6"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={200}
                  height={120}
                  loading="lazy"
                  className="max-w-full h-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
