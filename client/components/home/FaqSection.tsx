import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqContent } from "@/lib/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface FaqSectionProps {
  content?: FaqContent;
}

const defaultContent: FaqContent = {
  heading: "Frequently Asked Questions",
  description:
    "Aenean porta erat id urna porttitor scelerisque. Aliquam vitae auctor nunc.",
  videoThumbnail: "/images/backgrounds/faq-bg.jpg",
  videoUrl:
    "https://www.youtube.com/embed/FkQuawiGWUw?autoplay=1&feature=oembed",
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
};

export default function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  const data = content || defaultContent;
  const faqs = data.items || defaultContent.items;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-14">
          <h2 className="font-grotesk text-[clamp(2rem,5vw,52px)] font-light leading-[1.1] text-brand-dark mb-4">
            {data.heading}
          </h2>
          {data.description && (
            <RichText
              html={data.description}
              className="font-manrope text-[16px] leading-relaxed text-brand-dark/60 max-w-2xl mx-auto"
            />
          )}
        </AnimatedSection>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Left Side - Image */}
          {data.videoThumbnail && (
            <AnimatedSection className="lg:w-[45%] shrink-0" direction="left">
              <img
                src={data.videoThumbnail}
                alt={data.videoThumbnailAlt || "FAQ"}
                className="w-full h-auto object-cover"
                width={720}
                height={480}
                loading="lazy"
              />
            </AnimatedSection>
          )}

          {/* Accordion */}
          <AnimatedSection className="flex-1" delay={0.15}>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border border-brand-border/20 transition-all duration-200 ${
                    openIndex === index
                      ? "border-l-4 border-l-brand-accent bg-brand-dark"
                      : "hover:border-brand-border/40"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className={`w-full font-manrope text-[18px] leading-snug px-5 py-5 text-left flex items-center justify-between cursor-pointer gap-4 ${
                      openIndex === index ? "text-white" : "text-brand-dark"
                    }`}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-brand-accent transition-transform duration-200 ${
                        openIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openIndex === index && (
                    <RichText
                      html={faq.answer}
                      className="font-manrope text-[15px] leading-relaxed font-light px-5 pb-5 text-white/70"
                    />
                  )}
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
