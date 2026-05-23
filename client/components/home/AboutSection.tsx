import { Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { AboutContent } from "@site/lib/cms/homePageTypes";
import { useGlobalPhone } from "@/hooks/useSiteSettings";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface AboutSectionProps {
  content?: AboutContent;
  statsLayout?: "default" | "split-third";
  showBottomDivider?: boolean;
}

const defaultContent: AboutContent = {
  sectionLabel: "– About Us",
  heading: "About Our Firm",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi",
  phone: "",
  phoneLabel: "Call Us 24/7",
  contactLabel: "Contact Us",
  contactText: "For a Free Consultation",
  attorneyImage: "/images/team/attorney-1.png",
  attorneyImageAlt: "Attorney",
  features: [
    {
      number: "1",
      title: "Nationwide Representation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue tincidunt, rhoncus lacus a, congue diam.",
    },
    {
      number: "2",
      title: "Understanding Your Case",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue tincidunt, rhoncus lacus a, congue diam.",
    },
    {
      number: "3",
      title: "Seeking Compensation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget augue tincidunt, rhoncus lacus a, congue diam.",
    },
  ],
  stats: [
    { value: "1000+", label: "Trusted Clients Served" },
    { value: "$50 Million", label: "Recovered in Legal Dispute Settlements" },
    { value: "98%", label: "Client Satisfaction Rate" },
    { value: "150+", label: "Legal Professionals Available 24/7" },
  ],
};

export default function AboutSection({
  content,
  statsLayout = "default",
  showBottomDivider = false,
}: AboutSectionProps) {
  const data = content || defaultContent;
  const features = data.features || defaultContent.features;
  const stats = data.stats || defaultContent.stats;
  const { phoneNumber, phoneAvailability: phoneLabel, phoneDisplay } =
    useGlobalPhone();
  const useSplitThirdStatsLayout =
    statsLayout === "split-third" && stats.length === 3;

  const renderStat = (
    stat: (typeof stats)[number],
    index: number,
    className = "",
    labelClassName = "",
  ) => (
    <AnimatedSection
      key={`${stat.value}-${stat.label}-${index}`}
      delay={index * 0.08}
      className={`text-center ${className}`.trim()}
    >
      <p className="mb-1 font-grotesk text-[clamp(2.2rem,4vw,56px)] font-light tracking-tight text-brand-dark">
        {stat.value}
      </p>
      <div className="mx-auto mb-2 h-[2px] w-8 bg-brand-accent" />
      <p
        className={`mx-auto max-w-[160px] font-manrope text-[13px] leading-snug text-brand-dark/50 ${labelClassName}`.trim()}
      >
        {stat.label}
      </p>
    </AnimatedSection>
  );

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <AnimatedSection className="lg:w-full" direction="left">
            {data.sectionLabel && (
              <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
                {data.sectionLabel}
              </p>
            )}
            <div className="mb-8">
              <h2 className="font-grotesk text-[clamp(2rem,4vw,48px)] font-semibold leading-[1.15] text-brand-dark mb-6">
                {data.heading}
              </h2>
              <RichText
                html={data.description}
                className="font-manrope text-[15px] md:text-[17px] leading-7 text-brand-dark/78 [&_p]:mb-4 [&_p:last-child]:mb-0"
              />
            </div>

            <div className="flex flex-col gap-4 max-w-[340px]">
              {phoneDisplay && (
                <a
                  href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                  className="flex items-start gap-4 bg-brand-accent p-4 group hover:bg-brand-accent-dark transition-colors duration-300"
                >
                <div className="bg-brand-dark p-3 shrink-0 group-hover:bg-white transition-colors duration-300">
                  <Phone className="w-5 h-5 text-brand-accent group-hover:text-brand-dark transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div>
                  {phoneLabel && <p className="font-manrope text-[12px] text-brand-dark/60 mb-0.5">{phoneLabel}</p>}
                  <p className="font-grotesk text-[22px] font-medium text-brand-dark leading-tight">{phoneDisplay}</p>
                  </div>
                </a>
              )}

              {data.contactLabel && (
                <Link
                  to="/kontakt/"
                  className="flex items-start gap-4 bg-brand-accent p-4 group hover:bg-brand-accent-dark transition-colors duration-300"
                >
                <div className="bg-brand-dark p-3 shrink-0 group-hover:bg-white transition-colors duration-300">
                  <MessageCircle className="w-5 h-5 text-brand-accent group-hover:text-brand-dark transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-manrope text-[12px] text-brand-dark/60 mb-0.5">{data.contactLabel}</p>
                  <p className="font-grotesk text-[20px] font-medium text-brand-dark leading-tight">{data.contactText}</p>
                </div>
              </Link>
            )}
            </div>
          </AnimatedSection>

          <div className="lg:w-full flex flex-col gap-8 lg:gap-10">
            <AnimatedSection className="flex justify-center lg:justify-start" delay={0.1}>
              <img
                src={data.attorneyImage}
                alt={data.attorneyImageAlt}
                className="w-full max-w-[520px] h-auto object-contain max-h-[600px]"
                width={462}
                height={631}
                loading="lazy"
              />
            </AnimatedSection>

            <AnimatedSection className="flex flex-col gap-5" delay={0.2}>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white border border-brand-dark/8 hover:border-brand-accent/40 p-6 transition-all duration-300"
                >
                  <span
                    className="absolute top-3 right-4 font-grotesk text-[64px] font-light leading-none text-brand-dark/[0.04] select-none pointer-events-none"
                    aria-hidden="true"
                  >
                    {feature.number}
                  </span>
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-accent/0 group-hover:bg-brand-accent transition-all duration-300" />
                  <p className="font-manrope text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-accent mb-2">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="font-grotesk text-[18px] font-medium text-brand-dark mb-2">
                    {feature.title}
                  </h3>
                  <RichText
                    html={feature.description}
                    className="font-manrope text-[14px] leading-relaxed text-brand-dark/55 [&_p]:mb-3 [&_p:last-child]:mb-0"
                  />
                </div>
              ))}
            </AnimatedSection>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-16 border-t border-brand-dark/8">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14">
          {useSplitThirdStatsLayout ? (
            <div className="mx-auto flex max-w-[760px] flex-col items-center gap-10">
              <div className="grid w-full max-w-[620px] grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16">
                {stats.slice(0, 2).map((stat, index) =>
                  renderStat(stat, index, "mx-auto w-full max-w-[220px] min-h-[128px]"),
                )}
              </div>
              <div className="w-full max-w-[260px]">
                {renderStat(
                  stats[2],
                  2,
                  "mx-auto min-h-[128px]",
                  "max-w-none whitespace-nowrap",
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-x-16 gap-y-10">
              {stats.map((stat, index) =>
                renderStat(stat, index, "w-[180px]"),
              )}
            </div>
          )}

          {showBottomDivider && (
            <div className="flex justify-center pt-4 md:pt-6" aria-hidden="true">
              <div className="h-12 w-[1px] bg-gradient-to-b from-brand-accent/60 to-transparent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
