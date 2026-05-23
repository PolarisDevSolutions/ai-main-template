import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import PracticeAreaCard from "@site/components/practice/PracticeAreaCard";
import AboutSection from "@site/components/home/AboutSection";
import ProcessSection from "@site/components/home/ProcessSection";
import FaqSection from "@site/components/home/FaqSection";
import * as LucideIcons from "lucide-react";
import { type LucideIcon } from "lucide-react";
import { usePracticeAreasContent } from "@site/hooks/usePracticeAreasContent";
import MarketingHeroSection from "@site/components/shared/MarketingHeroSection";
import RichText from "@site/components/shared/RichText";
import SharedWhyChooseSection from "@site/components/shared/SharedWhyChooseSection";
import SharedCtaSection from "@site/components/shared/SharedCtaSection";

const lucideIconMap = Object.fromEntries(
  Object.entries(LucideIcons)
    .filter(([key, value]) => /^[A-Z]/.test(key) && (typeof value === "function" || typeof value === "object"))
    .map(([key, value]) => [key.replace(/Icon$/, "").replace(/[-_\s]/g, "").toLowerCase(), value]),
) as Record<string, LucideIcon>;

function resolvePracticeAreaIcon(name: string) {
  const normalizedName = name.replace(/[-_\s]/g, "").toLowerCase();
  return lucideIconMap[normalizedName] ?? LucideIcons.Scale;
}

export default function PracticeAreas() {
  const { content, meta } = usePracticeAreasContent();

  const practiceAreas = content.grid.areas.map((area) => ({
    icon: resolvePracticeAreaIcon(area.icon),
    title: area.title,
    description: area.description,
    image: area.image,
    imageAlt: area.imageAlt,
    link: area.link,
    linkLabel: area.linkLabel,
  }));

  return (
    <Layout>
      <Seo
        title={meta.meta_title || "Usluge"}
        description={meta.meta_description || undefined}
        canonical={meta.canonical_url || undefined}
        noindex={meta.noindex}
        ogTitle={meta.og_title || undefined}
        ogDescription={meta.og_description || undefined}
        ogImage={meta.og_image || undefined}
        schemaType={meta.schema_type}
        schemaData={meta.schema_data}
        pageContent={content}
      />

      <MarketingHeroSection content={content.hero} />

      <div className="bg-white pt-[40px] md:pt-[60px]">
        <div className="mx-auto w-[95%] max-w-[900px] md:w-[90%]">
          <div className="grid grid-cols-1 gap-5 text-center">
            <h2 className="font-grotesk text-[32px] leading-tight text-black md:text-[40px] lg:text-[48px]">
              {content.intro.title}
            </h2>
            <RichText
              html={content.intro.content}
              className="font-manrope text-[16px] leading-[26px] text-black/80 md:text-[18px] md:leading-[30px] [&_p]:mb-4 [&_p:last-child]:mb-0"
            />
          </div>
          <div className="mt-10 flex justify-center pb-[40px] md:mt-12 md:pb-[60px]" aria-hidden="true">
            <div className="h-12 w-[1px] bg-gradient-to-b from-brand-accent/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* Practice Areas Grid Section */}
      <div className="bg-white pt-0 pb-[40px] md:pb-[60px]">
        <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
          <div className="text-center mb-[30px] md:mb-[50px]">
            <h2 className="font-grotesk text-[32px] md:text-[48px] lg:text-[54px] leading-tight md:leading-[54px] text-black">
              {content.grid.heading}
            </h2>
            <RichText
              html={content.grid.description}
              className="font-manrope text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-black/80 mt-[15px] max-w-[800px] mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {practiceAreas.map((area, index) => (
              <PracticeAreaCard key={index} {...area} />
            ))}
          </div>
        </div>
      </div>

      <AboutSection content={content.aboutSection} theme="dark" showStats={false} />

      <div className="bg-white py-[40px] md:py-[60px]">
        <div className="mx-auto w-[95%] max-w-[900px] md:w-[90%]">
          <div className="grid grid-cols-1 gap-5 text-center">
            <h2 className="font-grotesk text-[32px] leading-tight text-black md:text-[40px] lg:text-[48px]">
              {content.outro.title}
            </h2>
            <RichText
              html={content.outro.content}
              className="font-manrope text-[16px] leading-[26px] text-black/80 md:text-[18px] md:leading-[30px] [&_p]:mb-4 [&_p:last-child]:mb-0"
            />
          </div>
        </div>
      </div>

      <div className="bg-white -my-10 flex justify-center md:-my-14" aria-hidden="true">
        <div className="h-12 w-[1px] bg-gradient-to-b from-brand-accent/60 to-transparent" />
      </div>
      <ProcessSection content={content.process} desktopColumns={4} />

      <SharedWhyChooseSection content={content.whyChoose} />

      <FaqSection content={content.faq} />

      <SharedCtaSection content={content.cta} />
    </Layout>
  );
}
