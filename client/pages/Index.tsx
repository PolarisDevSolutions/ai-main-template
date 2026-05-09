import { motion } from "framer-motion";
import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import HeroBackground from "@site/components/home/HeroBackground";
import HeroContactForm from "@site/components/home/HeroContactForm";
import AboutSection from "@site/components/home/AboutSection";
import PracticeAreasSection from "@site/components/home/PracticeAreasSection";
import PracticeAreasGrid from "@site/components/home/PracticeAreasGrid";
import WhyNeedUsSection from "@site/components/home/AwardsSection";
import ProcessSection from "@site/components/home/ProcessSection";
import GoogleReviewsSection from "@site/components/home/GoogleReviewsSection";
import FaqSection from "@site/components/home/FaqSection";
import ContactUsSection from "@site/components/home/ContactUsSection";
import DynamicHeading from "@site/components/shared/DynamicHeading";
import { useHomeContent } from "@site/hooks/useHomeContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import { Phone } from "lucide-react";

const headlineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const wordVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Index() {
  const { content, meta } = useHomeContent();
  const { phoneNumber, phoneDisplay, phoneLabel: globalPhoneLabel } = useGlobalPhone();

  const heroContent = content.hero;
  const partnerLogos = content.partnerLogos;
  const trustTexts = [heroContent.trustText1, heroContent.trustText2, heroContent.trustText3].filter(Boolean);

  const headlineWords = (heroContent.headline || "").split(" ").filter(Boolean);
  const highlightWords = (heroContent.highlightedText || "").split(" ").filter(Boolean);
  const heroPhoneLabel = heroContent.phoneLabel || globalPhoneLabel;

  return (
    <Layout>
      <Seo
        title={meta.meta_title || "Početna"}
        description={meta.meta_description || ""}
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
      <section className="relative min-h-screen flex flex-col justify-center -mt-20">
        <HeroBackground />

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-6 lg:px-10 pt-28 pb-16">
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">
            {/* Left: Headline + Phone CTA */}
            <div className="flex-1 min-w-0">
              {heroContent.h1Title && (
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-6"
                >
                  {heroContent.h1Title}
                </motion.p>
              )}

              <motion.h1
                variants={headlineVariants}
                initial="hidden"
                animate="visible"
                className="font-grotesk text-[clamp(2.5rem,6vw,72px)] font-light leading-[1.1] text-white mb-6"
              >
                {/* Highlighted words */}
                {highlightWords.map((word, i) => (
                  <motion.span
                    key={`h-${i}`}
                    variants={wordVariant}
                    className="inline-block text-brand-accent mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
                {highlightWords.length > 0 && <br />}
                {/* Regular headline words */}
                {headlineWords.map((word, i) => (
                  <motion.span
                    key={`w-${i}`}
                    variants={wordVariant}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </motion.h1>

              {heroContent.description && (
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.25 }}
                  className="max-w-[640px] font-manrope text-[16px] md:text-[18px] leading-7 text-white mb-8"
                >
                  {heroContent.description}
                </motion.p>
              )}

              {/* Phone CTA */}
              {phoneDisplay && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="max-w-[520px]"
                >
                  <a
                    href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                    className="inline-flex items-start gap-4 bg-brand-accent p-4 group hover:bg-brand-accent-dark transition-colors duration-300 max-w-[360px] w-full"
                  >
                    <div className="bg-brand-dark p-3 shrink-0 group-hover:bg-white transition-colors duration-300">
                      <Phone
                        className="w-6 h-6 text-brand-accent group-hover:text-brand-dark transition-colors duration-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      {heroPhoneLabel && (
                        <p className="font-manrope text-[13px] text-brand-dark/70 mb-0.5">
                          {heroPhoneLabel}
                        </p>
                      )}
                      <p className="font-grotesk text-[24px] font-medium text-brand-dark leading-tight">
                        {phoneDisplay}
                      </p>
                    </div>
                  </a>

                </motion.div>
              )}

            </div>

            {/* Right: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-[420px] shrink-0"
            >
              <div className="bg-brand-card/80 backdrop-blur-sm border border-brand-border/40 p-6 lg:p-8">
                <HeroContactForm title={heroContent.formTitle} />
              </div>

              {trustTexts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="mt-6"
                >
                  <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-4">
                    {trustTexts.map((text, index) => (
                      <div key={`${text}-${index}`} className="min-w-[110px] text-center">
                        <div className="w-6 h-[2px] bg-brand-accent/80 mx-auto mb-2" />
                        <p className="font-manrope text-[11px] uppercase tracking-[0.18em] text-white">
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand-accent/60 to-transparent" />
        </motion.div>
      </section>

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
      <PracticeAreasSection content={content.practiceAreasIntro} />
      <PracticeAreasGrid areas={content.practiceAreas} />
      <WhyNeedUsSection content={content.whyNeedUs} headingTag={content.headingTags?.["whyNeedUs.heading"]} />
      <ProcessSection content={content.process} />
      <GoogleReviewsSection content={content.googleReviews} />
      <FaqSection content={content.faq} />
      <ContactUsSection content={content.contact} />
    </Layout>
  );
}
