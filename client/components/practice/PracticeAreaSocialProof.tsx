import type { PracticeAreaSocialProofContent } from "@site/lib/cms/practiceAreaPageTypes";
import RichText from "@site/components/shared/RichText";
import LogoMarquee from "@site/components/shared/LogoMarquee";

interface PracticeAreaSocialProofProps {
  content: PracticeAreaSocialProofContent;
  headingTags?: Record<string, string>;
}

export default function PracticeAreaSocialProof({
  content,
  headingTags,
}: PracticeAreaSocialProofProps) {
  if (content.mode === "none") return null;

  if (content.mode === "testimonials") {
    return <TestimonialsView testimonials={content.testimonials} headingTags={headingTags} />;
  }

  return (
    <LogoMarquee
      title={content.awards.heading}
      logos={content.awards.logos || []}
      headingTag={headingTags?.["socialProof.awards.heading"]}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Testimonials - 3 cards in a row                                    */
/* ------------------------------------------------------------------ */
function TestimonialsView({
  testimonials,
  headingTags,
}: {
  testimonials: PracticeAreaSocialProofContent["testimonials"];
  headingTags?: Record<string, string>;
}) {
  return (
    <div className="bg-white py-[40px] md:py-[60px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-[rgb(239,239,239)] p-[30px] md:p-[40px] flex flex-col"
            >
              {item.ratingImage && (
                <img
                  src={item.ratingImage}
                  alt={item.ratingImageAlt || "Rating"}
                  width={186}
                  height={34}
                  loading="lazy"
                  className="max-w-[186px] mb-4"
                />
              )}
              <RichText
                html={item.text}
                className="font-manrope text-[18px] md:text-[20px] leading-[28px] md:leading-[30px] text-black flex-1"
              />
              <p className="font-manrope text-[18px] font-semibold text-black mt-4">
                — {item.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
