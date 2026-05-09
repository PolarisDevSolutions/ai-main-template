import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import type { WhyNeedUsContent } from "@/lib/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import { ArrowUpRight } from "lucide-react";

interface WhyNeedUsSectionProps {
  content?: WhyNeedUsContent;
  headingTag?: string;
}

const defaultContent: WhyNeedUsContent = {
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
};

export default function WhyNeedUsSection({ content, headingTag }: WhyNeedUsSectionProps) {
  const data = content || defaultContent;
  const cards = data.cards?.length ? data.cards : defaultContent.cards;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <AnimatedSection direction="left" className="max-w-[560px]">
            <DynamicHeading
              tag={headingTag}
              defaultTag="h2"
              className="font-grotesk text-[clamp(1.9rem,4vw,46px)] font-semibold leading-[1.12] text-brand-dark mb-6"
            >
              {data.heading}
            </DynamicHeading>

            {data.intro && (
              <RichText
                html={data.intro}
                className="font-manrope text-[15px] md:text-[17px] leading-7 text-brand-dark/75 [&_p]:mb-4 [&_p:last-child]:mb-0"
              />
            )}

            {data.buttonLabel && data.buttonLink && (
              <Link
                to={data.buttonLink}
                className="mt-8 inline-flex min-w-[220px] items-center justify-center gap-2 border border-brand-accent px-5 py-2.5 font-manrope text-[14px] font-medium tracking-wide text-brand-accent transition-all duration-200 hover:bg-brand-accent hover:text-brand-dark"
              >
                {data.buttonLabel}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            )}
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group relative min-h-[220px] border border-brand-dark/8 bg-white p-6 transition-all duration-300 hover:border-brand-accent/40 hover:bg-brand-card/40"
              >
                <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-brand-accent/0 via-brand-accent/70 to-brand-accent/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="font-manrope text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-accent mb-3">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-grotesk text-[22px] font-medium leading-tight text-brand-dark mb-3">
                  {card.title}
                </h3>
                <p className="font-manrope text-[14px] leading-7 text-brand-dark/62">
                  {card.description}
                </p>
              </div>
            ))}
          </AnimatedSection>
        </div>

        {data.closingParagraph && (
          <AnimatedSection delay={0.15} className="mt-12 border-t border-brand-dark/8 pt-10">
            <RichText
              html={data.closingParagraph}
              className="max-w-[980px] font-manrope text-[15px] md:text-[17px] leading-7 text-brand-dark/72 [&_p]:mb-4 [&_p:last-child]:mb-0"
            />
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
