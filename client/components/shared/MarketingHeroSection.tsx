import HeroBackground from "@site/components/home/HeroBackground";
import HeroContactForm from "@site/components/home/HeroContactForm";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import RichText from "@site/components/shared/RichText";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import type { SharedHeroContent } from "@site/lib/cms/sharedHero";
import { Phone } from "lucide-react";

interface MarketingHeroSectionProps {
  content: SharedHeroContent;
  headingTag?: string;
  fullHeight?: boolean;
  overlapHeader?: boolean;
  showScrollHint?: boolean;
}

export default function MarketingHeroSection({
  content,
  headingTag,
  fullHeight = false,
  overlapHeader = false,
  showScrollHint = false,
}: MarketingHeroSectionProps) {
  const { phoneNumber, phoneDisplay, phoneLabel: globalPhoneLabel } =
    useGlobalPhone();

  const highlightWords = (content.highlightedText || "").split(" ").filter(Boolean);
  const headlineWords = (content.headline || "").split(" ").filter(Boolean);
  const trustTexts = [content.trustText1, content.trustText2, content.trustText3].filter(Boolean);
  const heroPhoneLabel = content.phoneLabel || globalPhoneLabel;

  return (
    <section
      className={[
        "relative flex flex-col justify-center overflow-hidden bg-brand-dark",
        fullHeight ? "min-h-screen" : "",
        overlapHeader ? "-mt-20" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <HeroBackground />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-16 pt-28 lg:px-10">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="min-w-0 flex-1">
            {content.h1Title && (
              <p className="mb-6 font-manrope text-[13px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
                {content.h1Title}
              </p>
            )}

            <DynamicHeading
              tag={headingTag}
              defaultTag="h1"
              className="mb-6 font-grotesk text-[clamp(2.5rem,6vw,72px)] font-light leading-[1.1] text-white"
            >
              <>
                {highlightWords.map((word, index) => (
                  <span
                    key={`highlight-${word}-${index}`}
                    className="mr-[0.25em] inline-block text-brand-accent"
                  >
                    {word}
                  </span>
                ))}
                {highlightWords.length > 0 && headlineWords.length > 0 && <br />}
                {headlineWords.map((word, index) => (
                  <span key={`headline-${word}-${index}`} className="mr-[0.25em] inline-block">
                    {word}
                  </span>
                ))}
              </>
            </DynamicHeading>

            {content.description && (
              <RichText
                html={content.description}
                className="mb-8 max-w-[640px] font-manrope text-[16px] leading-7 text-white md:text-[18px]"
              />
            )}

            {phoneDisplay && (
              <div className="max-w-[520px]">
                <a
                  href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                  className="inline-flex w-full max-w-[360px] items-start gap-4 bg-brand-accent p-4 transition-colors duration-300 hover:bg-brand-accent-dark group"
                >
                  <div className="shrink-0 bg-brand-dark p-3 transition-colors duration-300 group-hover:bg-white">
                    <Phone
                      className="h-6 w-6 text-brand-accent transition-colors duration-300 group-hover:text-brand-dark"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    {heroPhoneLabel && (
                      <p className="mb-0.5 font-manrope text-[13px] text-brand-dark/70">
                        {heroPhoneLabel}
                      </p>
                    )}
                    <p className="font-grotesk text-[24px] font-medium leading-tight text-brand-dark">
                      {phoneDisplay}
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>

          <div className="shrink-0 lg:w-[420px]">
            <div className="border border-brand-border/40 bg-brand-card/80 p-6 backdrop-blur-sm lg:p-8">
              <HeroContactForm title={content.formTitle} />
            </div>

            {trustTexts.length > 0 && (
              <div className="mt-6">
                <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-4">
                  {trustTexts.map((text, index) => (
                    <div key={`${text}-${index}`} className="min-w-[110px] text-center">
                      <div className="mx-auto mb-2 h-[2px] w-6 bg-brand-accent/80" />
                      <p className="font-manrope text-[11px] uppercase tracking-[0.18em] text-white">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showScrollHint && (
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
          <div className="h-12 w-[1px] bg-gradient-to-b from-brand-accent/60 to-transparent" />
        </div>
      )}
    </section>
  );
}
