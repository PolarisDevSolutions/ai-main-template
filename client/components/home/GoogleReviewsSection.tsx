import type { GoogleReviewsContent } from "@/lib/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface GoogleReviewsSectionProps {
  content?: GoogleReviewsContent;
}

const defaultContent: GoogleReviewsContent = {
  sectionLabel: "– Google Reviews",
  heading: "Real Voices, Real Trust: Our Google Reviews",
  description:
    "Our clients share their stories and insights about working with us. Dive into their experiences to understand how we prioritize your legal success.",
  reviews: [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Lorem Ipsum",
      ratingImage:
        "",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Lorem Ipsum",
      ratingImage:
        "",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Lorem Ipsum",
      ratingImage:
        "",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Lorem Ipsum",
      ratingImage:
        "",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Lorem Ipsum",
      ratingImage:
        "",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Lorem Ipsum",
      ratingImage:
        "",
    },
  ],
};

export default function GoogleReviewsSection({
  content,
}: GoogleReviewsSectionProps) {
  const data = content || defaultContent;
  const reviews = data.reviews || defaultContent.reviews;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-14">
          {data.sectionLabel && (
            <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
              {data.sectionLabel}
            </p>
          )}
          <h2 className="font-grotesk text-[clamp(2rem,5vw,52px)] font-light leading-[1.1] text-brand-dark mb-4">
            {data.heading}
          </h2>
          {data.description && (
            <RichText
              html={data.description}
              className="font-manrope text-[15px] leading-relaxed text-brand-dark/60 max-w-2xl mx-auto"
            />
          )}
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <AnimatedSection key={index} delay={index * 0.06} className="border border-[#e8e8e8] p-6 flex flex-col">
              {review.ratingImage && (
                <img
                  src={review.ratingImage}
                  alt={review.ratingImageAlt || "5 stars"}
                  width={120}
                  height={22}
                  loading="lazy"
                  className="mb-4 h-5 w-auto object-contain"
                />
              )}
              <RichText
                html={review.text}
                className="font-manrope text-[15px] leading-relaxed text-brand-dark/70 flex-1 mb-4"
              />
              <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-4">
                <strong className="font-manrope font-semibold text-[14px] text-brand-dark">{review.author}</strong>
                <img
                  src="/images/logos/google-icon.png"
                  alt="Google"
                  width={20}
                  height={20}
                  loading="lazy"
                  className="opacity-70"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
