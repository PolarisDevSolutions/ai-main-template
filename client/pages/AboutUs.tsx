import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import AboutSection from "@site/components/home/AboutSection";
import ProcessSection from "@site/components/home/ProcessSection";
import FaqSection from "@site/components/home/FaqSection";
import { useAboutContent } from "@site/hooks/useAboutContent";
import MarketingHeroSection from "@site/components/shared/MarketingHeroSection";
import RichText from "@site/components/shared/RichText";
import SharedWhyChooseSection from "@site/components/shared/SharedWhyChooseSection";
import SharedCtaSection from "@site/components/shared/SharedCtaSection";

export default function AboutUs() {
  const { content, meta } = useAboutContent();

  return (
    <Layout>
      <Seo
        title={meta.meta_title || "O Nama"}
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

      <AboutSection
        content={content.story}
        statsLayout="split-third"
        showBottomDivider
        compactBottomPadding
      />

      <SharedWhyChooseSection content={content.whyChooseUs} />

      {/* Our Approach Section */}
      <div className="bg-brand-dark py-[40px] md:py-[60px]">
        <div className="mx-auto flex w-[95%] max-w-[900px] flex-col items-center text-center md:w-[90%]">
          <h2 className="pb-[15px] font-grotesk text-[32px] leading-tight text-brand-accent md:pb-[20px] md:text-[40px]">
            {content.missionVision.heading}
          </h2>
          <RichText
            html={content.missionVision.text}
            className="font-manrope text-[16px] leading-[26px] text-white md:text-[18px] md:leading-[30px] [&_p]:mb-4 [&_p:last-child]:mb-0"
          />
          <div className="mt-10 flex justify-center md:mt-12" aria-hidden="true">
            <div className="h-12 w-[1px] bg-gradient-to-b from-brand-accent/60 to-transparent" />
          </div>
        </div>
      </div>

      <ProcessSection content={content.process} desktopColumns={4} />
      <div className="bg-white -my-10 flex justify-center md:-my-14" aria-hidden="true">
        <div className="h-12 w-[1px] bg-gradient-to-b from-brand-accent/60 to-transparent" />
      </div>
      <FaqSection content={content.faq} />

      <SharedCtaSection content={content.cta} />
    </Layout>
  );
}
