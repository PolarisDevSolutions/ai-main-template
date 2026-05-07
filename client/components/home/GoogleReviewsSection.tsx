import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { GoogleReviewsContent } from "@/lib/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface GoogleReviewsSectionProps {
  content?: GoogleReviewsContent;
}

const defaultContent: GoogleReviewsContent = {
  sectionLabel: "– Google Recenzije",
  heading: "Šta klijenti kažu o nama",
  description: "",
  reviews: [
    { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.", author: "Marko P.", ratingImage: "" },
    { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.", author: "Ana S.", ratingImage: "" },
    { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.", author: "Nikola D.", ratingImage: "" },
  ],
};

export default function GoogleReviewsSection({ content }: GoogleReviewsSectionProps) {
  const data = content || defaultContent;
  const reviews = data.reviews?.length ? data.reviews : defaultContent.reviews;
  const [activeIndex, setActiveIndex] = useState(0);
  const total = reviews.length;

  const prev = () => setActiveIndex((i) => (i - 1 + total) % total);
  const next = () => setActiveIndex((i) => (i + 1) % total);

  return (
    <section className="bg-brand-dark py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            {data.sectionLabel && (
              <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
                {data.sectionLabel}
              </p>
            )}
            <h2 className="font-grotesk text-[clamp(2rem,5vw,52px)] font-light leading-[1.1] text-white">
              {data.heading}
            </h2>
            {data.description && (
              <RichText html={data.description} className="font-manrope text-[15px] leading-relaxed text-white/50 mt-3 max-w-xl" />
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={prev} className="w-10 h-10 border border-brand-border/60 flex items-center justify-center text-white/60 hover:border-brand-accent hover:text-brand-accent transition-all duration-200" aria-label="Prethodni">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-manrope text-[13px] text-white/40 w-16 text-center">
              {activeIndex + 1} / {total}
            </span>
            <button onClick={next} className="w-10 h-10 border border-brand-border/60 flex items-center justify-center text-white/60 hover:border-brand-accent hover:text-brand-accent transition-all duration-200" aria-label="Sledeći">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </AnimatedSection>

        {/* Slider track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(calc(-${activeIndex} * (100% / 3 + 8px)))` }}
          >
            {reviews.map((review, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`shrink-0 bg-brand-card border p-6 flex flex-col cursor-pointer transition-all duration-300 ${
                    isActive ? "border-brand-accent/40" : "border-brand-border/20 opacity-60 hover:opacity-80"
                  }`}
                  style={{ width: "calc(100% / 3 - 16px)" }}
                >
                  {review.ratingImage && (
                    <img src={review.ratingImage} alt={review.ratingImageAlt || "5 stars"} width={100} height={18} loading="lazy" className="mb-4 h-4 w-auto object-contain" />
                  )}
                  <RichText html={review.text} className="font-manrope text-[15px] leading-relaxed text-white/70 flex-1 mb-6" />
                  <div className="flex items-center justify-between border-t border-brand-border/20 pt-4">
                    <strong className="font-manrope font-semibold text-[13px] text-white/80">{review.author}</strong>
                    <img src="/images/logos/google-icon.png" alt="Google" width={18} height={18} loading="lazy" className="opacity-40" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center gap-2 mt-8 justify-center">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-[3px] transition-all duration-300 ${i === activeIndex ? "w-8 bg-brand-accent" : "w-3 bg-brand-border/40"}`}
              aria-label={`Recenzija ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
