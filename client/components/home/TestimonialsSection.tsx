import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { TestimonialsContent } from "@/lib/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface TestimonialsSectionProps {
  content?: TestimonialsContent;
}

const defaultContent: TestimonialsContent = {
  sectionLabel: "– Testimonials",
  heading: "Inspiring client success stories that drive change.",
  backgroundImage: "/images/backgrounds/testimonials-bg.jpg",
  items: [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Sharon",
      ratingImage: "/images/logos/rating-stars.png",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Sharon",
      ratingImage: "/images/logos/rating-stars.png",
    },
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi . Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
      author: "Sharon",
      ratingImage: "/images/logos/rating-stars.png",
    },
  ],
};

export default function TestimonialsSection({
  content,
}: TestimonialsSectionProps) {
  const [activeSlide, setActiveSlide] = useState(0);
  const data = content || defaultContent;
  const testimonials = data.items || defaultContent.items;

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <AnimatedSection className="max-w-[1400px] mx-auto px-6 lg:px-10 mb-12 text-center">
        {data.sectionLabel && (
          <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
            {data.sectionLabel}
          </p>
        )}
        <h2 className="font-grotesk text-[clamp(2rem,5vw,52px)] font-light leading-[1.1] text-brand-dark">
          {data.heading}
        </h2>
      </AnimatedSection>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col lg:flex-row gap-10 lg:gap-16">
        <AnimatedSection className="lg:w-[48.5%] flex items-center justify-center" direction="left">
          <img
            src={data.backgroundImage}
            alt={data.backgroundImageAlt || "Testimonials"}
            width={609}
            height={530}
            loading="lazy"
            className="max-w-full"
          />
        </AnimatedSection>

        <AnimatedSection className="lg:w-[48.5%] relative group" delay={0.15}>
          {/* Carousel Container */}
          <div className="relative min-h-[502px] overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 bg-white bg-[url('/images/backgrounds/quote-bg.png')] bg-no-repeat bg-[position:left_10%_top_10%] px-[6%]"
                >
                  <div className="flex items-center min-h-[502px]">
                    <div className="w-full p-[30px]">
                      <RichText
                        html={testimonial.text}
                        className="font-manrope text-[24px] leading-[31.2px] text-black pb-[10px] text-left"
                      />
                      <div className="font-manrope text-[24px] font-semibold text-black text-left">
                        <img
                          src={testimonial.ratingImage}
                          alt={testimonial.ratingImageAlt || "Rating"}
                          width={186}
                          height={34}
                          loading="lazy"
                          className="max-w-full mb-1"
                        />
                        <br />
                        Objavio {testimonial.author}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 text-[rgb(95,99,104)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[100] cursor-pointer bg-white/80 hover:bg-white p-2"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-[rgb(95,99,104)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-[100] cursor-pointer bg-white/80 hover:bg-white p-2"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Pagination Dots */}
          <div className="absolute bottom-[20px] left-0 w-full text-center z-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`inline-block w-[8px] h-[8px] bg-brand-accent border border-brand-accent-dark ${
                  index === activeSlide ? "opacity-100" : "opacity-50"
                } ${index < testimonials.length - 1 ? "mr-[10px]" : ""} cursor-pointer transition-opacity hover:opacity-100`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
