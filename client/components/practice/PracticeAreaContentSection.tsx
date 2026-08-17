import { Phone, Calendar } from "lucide-react";
import type {
  PracticeAreaContentSectionItem,
  PracticeAreaCtaContent,
} from "@site/lib/cms/practiceAreaPageTypes";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import CallBox from "@site/components/shared/CallBox";
import RichText from "@site/components/shared/RichText";

interface PracticeAreaContentSectionProps {
  section: PracticeAreaContentSectionItem;
  cta: PracticeAreaCtaContent;
  index: number;
}

export default function PracticeAreaContentSection({
  section,
  cta,
  index,
}: PracticeAreaContentSectionProps) {
  const { phoneNumber, phoneDisplay } = useGlobalPhone();
  const imageOnLeft = section.imagePosition === "left";
  const showCTAs = section.showCTAs !== false;
  const isDark = section.theme === "dark";
  const background = isDark ? "bg-brand-dark" : index % 2 === 0 ? "bg-white" : "bg-gray-50";
  const textColor = isDark ? "text-white/85" : "text-black/85";
  const headingColor = isDark ? "text-brand-accent" : "text-black";

  return (
    <section className={`py-[48px] md:py-[72px] ${background}`}>
      <div className="mx-auto w-[95%] max-w-[1400px] md:w-[90%]">
        <div
          className={`flex flex-col ${imageOnLeft ? "lg:flex-row-reverse" : "lg:flex-row"} gap-10 lg:gap-[7%] items-center`}
        >
          <div className={showCTAs || section.image ? "lg:w-[60%]" : "w-full"}>
            {section.label && (
              <p className="mb-4 font-manrope text-sm font-semibold uppercase tracking-[0.16em] text-brand-accent">
                {section.label}
              </p>
            )}
            {section.heading && (
              <h2 className={`mb-6 font-grotesk text-[32px] leading-tight md:text-[44px] ${headingColor}`}>
                {section.heading}
              </h2>
            )}
            <RichText
              html={section.body}
              className={`font-manrope text-[16px] leading-[27px] md:text-[18px] md:leading-[30px] prose prose-lg max-w-none ${textColor}
                [&_h3]:font-grotesk [&_h3]:text-[22px] [&_h3]:md:text-[28px] [&_h3]:leading-tight [&_h3]:text-brand-accent [&_h3]:mb-3
                [&_p]:mb-4 [&_ul]:mb-5 [&_ol]:mb-5 [&_li]:mb-2 [&_a]:text-brand-accent [&_a]:underline-offset-4 hover:[&_a]:underline`}
            />
          </div>

          {(showCTAs || section.image) && (
            <div className="w-full lg:w-[33%]">
              {section.image && (
                <div className="mb-6 border border-brand-accent/40 bg-brand-card p-2">
                  <img
                    src={section.image}
                    alt={section.imageAlt || ""}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {showCTAs && (
                <div className="flex flex-col gap-4">
                  <CallBox
                    icon={Phone}
                    title={cta.primaryLabel}
                    subtitle={phoneDisplay}
                    phone={phoneNumber}
                    variant="brand-dark-accent"
                    className="max-w-none lg:w-full"
                  />
                  <CallBox
                    icon={Calendar}
                    title={cta.secondaryLabel}
                    subtitle={cta.secondarySublabel}
                    link={cta.secondaryLink}
                    variant="brand-dark-accent"
                    className="max-w-none lg:w-full"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
