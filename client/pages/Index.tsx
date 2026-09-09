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
import LogoMarquee from "@site/components/shared/LogoMarquee";
import ServicesOutroSection from "@site/components/home/ServicesOutroSection";
import FeaturedProjectsSection from "@site/components/home/FeaturedProjectsSection";
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
        title={meta.meta_title || undefined}
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
        fullHeight
        overlapHeader
        showScrollHint
        tagline={heroContent.tagline}
        formContent={heroContent.form}
      />

      <LogoMarquee
        title={content.partnerLogosTitle}
        logos={partnerLogos || []}
        headingTag={content.headingTags?.["partnerLogos.title"]}
      />

      <PracticeAreasSection content={content.practiceAreasIntro} />
      <PracticeAreasGrid areas={content.practiceAreas} />
      <ServicesOutroSection content={content.servicesOutro} />
      <SectionDivider />
      <AboutSection content={content.about} showPhone={false} showStats />
      <SectionDivider />
      <WhyNeedUsSection content={content.whyNeedUs} headingTag={content.headingTags?.["whyNeedUs.heading"]} />
      <FeaturedProjectsSection content={content.featuredProjects} />
      <SectionDivider />
      <ProcessSection content={content.process} desktopColumns={4} />
      <SectionDivider />
      <GoogleReviewsSection content={content.googleReviews} />
      <SectionDivider backgroundClass="bg-brand-dark" />
      <FaqSection content={content.faq} />
      <SectionDivider />
      <ContactUsSection content={content.contact} />
    </Layout>
  );
}
