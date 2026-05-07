import { Layers } from "lucide-react";
import { Link } from "react-router-dom";
import type { PracticeAreasIntroContent } from "@/lib/cms/homePageTypes";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface PracticeAreasSectionProps {
  content?: PracticeAreasIntroContent;
}

const defaultContent: PracticeAreasIntroContent = {
  sectionLabel: "– Practice Areas",
  heading: "Practice Areas",
  buttonLink: "/practice-areas/",
};

export default function PracticeAreasSection({ content }: PracticeAreasSectionProps) {
  const data = content || defaultContent;

  return (
    <section className="bg-brand-dark py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end gap-10 md:gap-16">
          <AnimatedSection className="flex-1" direction="left">
            {data.sectionLabel && (
              <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
                {data.sectionLabel}
              </p>
            )}
            <h2 className="font-grotesk text-[clamp(2rem,5vw,56px)] font-light leading-[1.1] text-white">
              {data.heading}
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.15}>
            <Link
              to={data.buttonLink || "/practice-areas/"}
              className="flex items-center gap-4 bg-brand-accent p-5 group hover:bg-brand-accent-dark transition-colors duration-300 max-w-[320px]"
            >
              <div className="bg-brand-dark p-3 shrink-0 group-hover:bg-white transition-colors duration-300">
                <Layers className="w-6 h-6 text-brand-accent group-hover:text-brand-dark transition-colors duration-300" />
              </div>
              <div>
                <p className="font-manrope text-[13px] text-brand-dark/70 mb-0.5">Otkrijte</p>
                <p className="font-grotesk text-[20px] font-medium text-brand-dark leading-tight">Sve naše usluge</p>
              </div>
            </Link>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
