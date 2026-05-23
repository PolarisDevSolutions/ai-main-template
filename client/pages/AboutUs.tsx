import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import AboutSection from "@site/components/home/AboutSection";
import CallBox from "@site/components/shared/CallBox";
import TeamMemberCard from "@site/components/about/TeamMemberCard";
import ValueCard from "@site/components/about/ValueCard";
import {
  Phone,
  Calendar,
  Scale,
  Award,
  Users,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { useAboutContent } from "@site/hooks/useAboutContent";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import MarketingHeroSection from "@site/components/shared/MarketingHeroSection";
import RichText from "@site/components/shared/RichText";

// Icon mapping for values section
const iconMap: Record<string, LucideIcon> = {
  Scale,
  Award,
  Users,
  Heart,
};

export default function AboutUs() {
  const { content, meta } = useAboutContent();
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();

  // Map team members from CMS content
  const teamMembers = content.team.members;

  // Map core values from CMS content with icon components
  const coreValues = content.values.items.map((item) => ({
    icon: iconMap[item.icon] || Scale,
    title: item.title,
    description: item.description,
  }));

  // Map why choose us from CMS content
  const whyChooseUs = content.whyChooseUs.items;

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

      {/* Why Choose Us Section */}
      <div className="bg-white pt-[30px] md:pt-[40px] pb-[40px] md:pb-[60px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-stretch">
            <div>
              <div className="mb-4">
                <p className="font-manrope text-[13px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
                  {content.whyChooseUs.sectionLabel}
                </p>
              </div>
              <h2 className="mb-6 font-grotesk text-[clamp(2rem,4vw,48px)] font-semibold leading-[1.15] text-brand-dark">
                {content.whyChooseUs.heading}
              </h2>
              <RichText
                html={content.whyChooseUs.description}
                className="font-manrope text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-black mb-[30px]"
              />
              {content.whyChooseUs.image && (
                <div className="hidden lg:flex justify-center">
                  <img
                    src={content.whyChooseUs.image}
                    alt={content.whyChooseUs.imageAlt || "Why Choose Us"}
                    className="h-auto w-full max-w-[400px] object-cover"
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </div>
              )}
            </div>

            <div className="flex h-full flex-col justify-center gap-5 md:gap-6">
              {whyChooseUs.map((feature, index) => (
                <div
                  key={index}
                  className="group relative border border-brand-dark/8 bg-white p-6 transition-all duration-300 hover:border-brand-accent/40"
                >
                  <span
                    className="pointer-events-none absolute right-4 top-3 select-none font-grotesk text-[64px] font-light leading-none text-brand-dark/[0.04]"
                    aria-hidden="true"
                  >
                    {feature.number}
                  </span>
                  <div className="absolute bottom-0 left-0 top-0 w-[3px] bg-brand-accent/0 transition-all duration-300 group-hover:bg-brand-accent" />
                  <p className="mb-2 font-manrope text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mb-2 font-grotesk text-[18px] font-medium text-brand-dark">
                    {feature.title}
                  </h3>
                  <RichText
                    html={feature.description}
                    className="font-manrope text-[14px] leading-relaxed text-brand-dark/55 [&_p]:mb-3 [&_p:last-child]:mb-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Our Approach Section */}
      <div className="bg-brand-accent-dark py-[40px] md:py-[60px]">
        <div className="mx-auto flex w-[95%] max-w-[900px] flex-col items-center text-center md:w-[90%]">
          <h2 className="pb-[15px] font-grotesk text-[32px] leading-tight text-brand-accent md:pb-[20px] md:text-[40px]">
            {content.missionVision.heading}
          </h2>
          <RichText
            html={content.missionVision.text}
            className="font-manrope text-[16px] leading-[26px] text-white md:text-[18px] md:leading-[30px] [&_p]:mb-4 [&_p:last-child]:mb-0"
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white pt-[40px] md:pt-[60px] pb-[30px] md:pb-[54px]">
        <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
          <div className="text-center mb-[30px] md:mb-[50px]">
            <div className="mb-[10px]">
              <p className="font-manrope text-[18px] md:text-[24px] leading-tight md:leading-[36px] text-[rgb(107,141,12)]">
                {content.team.sectionLabel}
              </p>
            </div>
            <h2 className="font-grotesk text-[32px] md:text-[48px] lg:text-[54px] leading-tight md:leading-[54px] text-black">
              {content.team.heading.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < content.team.heading.split("\n").length - 1 && (
                    <br className="hidden md:block" />
                  )}
                </span>
              ))}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} {...member} />
            ))}
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-brand-dark py-[40px] md:py-[60px]">
        <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
          <div className="text-center mb-[30px] md:mb-[50px]">
            <div className="mb-[10px]">
              <p className="font-manrope text-[18px] md:text-[24px] leading-tight md:leading-[36px] text-brand-accent">
                {content.values.sectionLabel}
              </p>
            </div>
            <h2 className="font-grotesk text-[32px] md:text-[48px] lg:text-[54px] leading-tight md:leading-[54px] text-white">
              {content.values.heading}
            </h2>
            {content.values.subtitle && (
              <p className="font-manrope text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-white/80 mt-[15px]">
                {content.values.subtitle}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-[5%]">
            {coreValues.map((value, index) => (
              <ValueCard key={index} {...value} />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-brand-accent py-[40px] md:py-[60px]">
        <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[80%]">
          <div className="text-center mb-[30px] md:mb-[40px]">
            <h2 className="font-grotesk text-[36px] md:text-[48px] lg:text-[60px] leading-tight text-black pb-[15px]">
              {content.cta.heading}
            </h2>
            <RichText
              html={content.cta.description}
              className="font-manrope text-[18px] md:text-[22px] leading-[26px] md:leading-[32px] text-black/80"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center md:items-start">
            <CallBox
              icon={Phone}
              title={phoneLabel}
              subtitle={phoneDisplay}
              phone={phoneNumber}
              className="bg-brand-accent-dark hover:bg-black"
              variant="dark"
            />
            <CallBox
              icon={Calendar}
              title={content.cta.secondaryButton.label}
              subtitle={content.cta.secondaryButton.sublabel}
              link={content.cta.secondaryButton.link}
              className="bg-brand-accent-dark hover:bg-black"
              variant="dark"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
