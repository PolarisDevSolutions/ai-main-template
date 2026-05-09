import { motion } from "framer-motion";
import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import AboutSection from "@site/components/home/AboutSection";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import PracticeAreasGrid from "@site/components/home/PracticeAreasGrid";
import WhyNeedUsSection from "@site/components/home/AwardsSection";
import ProcessSection from "@site/components/home/ProcessSection";
import GoogleReviewsSection from "@site/components/home/GoogleReviewsSection";
import FaqSection from "@site/components/home/FaqSection";
import ContactUsSection from "@site/components/home/ContactUsSection";
import MarketingHeroSection from "@site/components/shared/MarketingHeroSection";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import { useHomeContent } from "@site/hooks/useHomeContent";

function SectionDivider({ backgroundClass = "bg-white" }: { backgroundClass?: string }) {
  return (
    <div className={backgroundClass} aria-hidden="true">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center px-6 py-4 lg:px-10 md:py-6">
        <div className="h-12 w-[1px] bg-gradient-to-b from-brand-accent/60 to-transparent" />
      </div>
    </div>
  );
}

export default function Index() {
  const { content, meta } = useHomeContent();

  const heroContent = content.hero;
  const partnerLogos = content.partnerLogos;

  return (
    <Layout>
      <Seo
        title={meta.meta_title || "Početna"}
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

      {/* ── Hero Section ── */}
      <MarketingHeroSection
        content={heroContent}
        headingTag={content.headingTags?.["hero.headline"]}
        fullHeight
        overlapHeader
        showScrollHint
      />

      {/* ── Partner Logos Marquee ── */}
      {partnerLogos && partnerLogos.length > 0 && (
        <div className="w-full overflow-hidden border-y border-brand-dark/8 py-8 bg-white">
          {content.partnerLogosTitle && (
            <div className="px-6 lg:px-10 pb-6">
              <DynamicHeading
                tag={content.headingTags?.["partnerLogos.title"]}
                defaultTag="h3"
                className="text-center font-grotesk text-[clamp(0.95rem,1.6vw,18px)] font-medium leading-tight tracking-[0.24em] uppercase text-brand-dark"
              >
                {content.partnerLogosTitle}
              </DynamicHeading>
            </div>
          )}
          <div className="flex animate-marquee whitespace-nowrap" style={{ width: "max-content" }}>
            {[...partnerLogos, ...partnerLogos].map((logo, index) => (
              <div key={index} className="inline-flex h-[88px] w-[190px] items-center justify-center px-8 shrink-0">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={150}
                  height={48}
                  className="h-[48px] w-[150px] object-contain opacity-50 grayscale hover:grayscale-0 hover:opacity-80 transition-opacity duration-200"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Home Sections ── */}
      <AboutSection content={content.about} />
      <SectionDivider />
      <PracticeAreasSection content={content.practiceAreasIntro} />
      <SectionDivider backgroundClass="bg-brand-dark" />
      <PracticeAreasGrid areas={content.practiceAreas} />
      <SectionDivider />
      <WhyNeedUsSection content={content.whyNeedUs} headingTag={content.headingTags?.["whyNeedUs.heading"]} />
      <SectionDivider />
      <ProcessSection content={content.process} />
      <SectionDivider />
      <GoogleReviewsSection content={content.googleReviews} />
      <SectionDivider backgroundClass="bg-brand-dark" />
      <FaqSection content={content.faq} />
      <SectionDivider />
      <ContactUsSection content={content.contact} />
    </Layout>
  );
}
