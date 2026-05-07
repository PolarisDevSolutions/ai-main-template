import { Phone, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import type { AboutContent } from "@site/lib/cms/homePageTypes";
import { useGlobalPhone } from "@/hooks/useSiteSettings";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface AboutSectionProps {
  content?: AboutContent;
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

export default function AboutSection({ content }: AboutSectionProps) {
  const data = content || defaultContent;
  const features = data.features || defaultContent.features;
  const stats = data.stats || defaultContent.stats;
const { phoneNumber, phoneAvailability: phoneLabel, phoneDisplay } = useGlobalPhone();

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          <AnimatedSection className="md:w-full" direction="left">
            {data.sectionLabel && (
              <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
                {data.sectionLabel}
              </p>
            )}
            <div className="mb-8">
              <h2 className="font-grotesk text-[clamp(2rem,4vw,48px)] font-light leading-[1.15] text-brand-dark mb-6">
                {data.heading}
              </h2>
              <RichText
                html={data.description}
                className="font-manrope text-[16px] md:text-[20px] leading-[24px] md:leading-[30px] text-black"
              />
            </div>

            {phoneDisplay && (
              <a
                href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                className="flex items-start gap-4 bg-brand-accent p-4 group hover:bg-brand-accent-dark transition-colors duration-300 max-w-[340px] mb-4"
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
                to="/contact/"
                className="flex items-start gap-4 bg-brand-accent p-4 group hover:bg-brand-accent-dark transition-colors duration-300 max-w-[340px]"
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
          </AnimatedSection>

          <AnimatedSection className="md:w-full flex justify-center" delay={0.1}>
            <img
              src={data.attorneyImage}
              alt={data.attorneyImageAlt}
              className="max-w-full w-auto h-auto object-contain max-h-[600px]"
              width={462}
              height={631}
              loading="lazy"
            />
          </AnimatedSection>

          <AnimatedSection className="md:w-full flex flex-col gap-5" delay={0.2}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white border border-brand-dark/8 hover:border-brand-accent/40 p-6 transition-all duration-300"
              >
                {/* Large background number */}
                <span
                  className="absolute top-3 right-4 font-grotesk text-[64px] font-light leading-none text-brand-dark/[0.04] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {feature.number}
                </span>
                {/* Gold left border accent */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-accent/0 group-hover:bg-brand-accent transition-all duration-300" />
                <p className="font-manrope text-[11px] font-semibold tracking-[0.18em] uppercase text-brand-accent mb-2">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="font-grotesk text-[18px] font-medium text-brand-dark mb-2">
                  {feature.title}
                </h3>
                <RichText
                  html={feature.description}
                  className="font-manrope text-[14px] leading-relaxed text-brand-dark/55"
                />
              </div>
            ))}
          </AnimatedSection>
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-t border-brand-dark/8 mt-16">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 place-items-center">
            {stats.map((stat, index) => (
              <AnimatedSection key={index} delay={index * 0.08} className="text-center w-full">
                <p className="font-grotesk text-[clamp(2.2rem,4vw,56px)] font-light text-brand-dark mb-1 tracking-tight">
                  {stat.value}
                </p>
                <div className="w-8 h-[2px] bg-brand-accent mx-auto mb-2" />
                <p className="font-manrope text-[13px] text-brand-dark/50 leading-snug max-w-[160px] mx-auto">
                  {stat.label}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
