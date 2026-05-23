import Seo from "@site/components/Seo";
import Layout from "@site/components/layout/Layout";
import ContactForm from "@site/components/home/ContactForm";
import CallBox from "@site/components/shared/CallBox";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { useContactContent } from "@site/hooks/useContactContent";
import { useGlobalPhone, useSiteSettings } from "@site/contexts/SiteSettingsContext";
import MarketingHeroSection from "@site/components/shared/MarketingHeroSection";
import RichText from "@site/components/shared/RichText";

// Icon mapping for contact methods
const iconMap: Record<string, LucideIcon> = {
  Phone,
  Mail,
  MapPin,
  Clock,
};

function formatTelHref(value: string) {
  const trimmed = value.trim();
  if (!trimmed) {
    return "";
  }

  return `tel:${trimmed.replace(/(?!^)\+/g, "").replace(/[^\d+]/g, "")}`;
}

export default function ContactPage() {
  const { content, meta } = useContactContent();
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();
  const { settings } = useSiteSettings();

  // Map contact methods from CMS content with icon components
  const contactMethods = content.contactMethods.methods.map((method) => {
    let detail = method.detail;
    let subDetail = method.subDetail;

    if (method.icon === "Phone") {
      detail = phoneDisplay || detail;
    }

    if (method.icon === "Mail") {
      detail = method.email || detail;
    }

    if (method.icon === "MapPin") {
      if (!detail) detail = settings.addressLine1 || "";
      if (!subDetail) subDetail = settings.addressLine2 || "";
    }

    return {
      iconKey: method.icon,
      icon: iconMap[method.icon] || Phone,
      title: method.title,
      detail,
      subDetail,
    };
  });

  const officeHours = content.officeHours.items;

  return (
    <Layout>
      <Seo
        title={meta.meta_title || "Kontakt"}
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

      {/* Contact Methods Section */}
      <div className="bg-white py-[40px] md:py-[60px]">
        <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div
                  key={index}
                  className="border border-brand-accent/40 bg-white p-[24px] md:p-[28px] text-center transition-all duration-300 hover:border-brand-accent"
                >
                  <div className="mb-[16px] flex justify-center">
                    <div className="flex h-[56px] w-[56px] items-center justify-center border border-brand-accent/40 bg-brand-accent/8">
                      <Icon
                        className="h-[22px] w-[22px] text-brand-accent md:h-[24px] md:w-[24px]"
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>
                  <h3 className="mb-[10px] font-grotesk text-[20px] md:text-[22px] leading-tight text-brand-dark">
                    {method.title}
                  </h3>
                  <p className="mb-[6px] font-manrope text-[15px] md:text-[17px] text-brand-dark">
                    {method.iconKey === "Phone" ? (
                      <a href={formatTelHref(phoneNumber || method.detail)} className="hover:text-brand-accent transition-colors duration-300">
                        {method.detail}
                      </a>
                    ) : (
                      method.detail
                    )}
                  </p>
                  <p className="font-manrope text-[13px] md:text-[14px] text-brand-dark/65">
                    {method.subDetail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contact Form & Office Hours Section */}
      <div className="bg-brand-dark py-[40px] md:py-[60px]">
        <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[85%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-[8%]">
            {/* Left Side - Contact Form */}
            <div>
              <div className="mb-[20px] md:mb-[30px]">
                <h2 className="font-grotesk text-[32px] md:text-[40px] leading-tight text-white pb-[10px]">
                  {content.form.heading}
                </h2>
                {content.form.subtext && (
                  <RichText
                    html={content.form.subtext}
                    className="font-manrope text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-white/80"
                  />
                )}
              </div>
              <ContactForm />
            </div>

            {/* Right Side - Office Hours & Additional Info */}
            <div className="space-y-[30px] md:space-y-[40px]">
              {/* Office Hours */}
              <div className="bg-brand-card border border-brand-border p-[30px] md:p-[40px]">
                <div className="flex items-center gap-3 mb-[20px]">
                  <div className="bg-brand-accent p-[15px]">
                    <Clock
                      className="w-[30px] h-[30px] text-black"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-grotesk text-[24px] md:text-[28px] leading-tight text-white">
                    {content.officeHours.heading}
                  </h3>
                </div>
                <div className="space-y-[15px]">
                  {officeHours.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center pb-[15px] border-b border-brand-border/50 last:border-0 last:pb-0"
                    >
                      <span className="font-manrope text-[16px] md:text-[18px] text-white/80">
                        {item.day}
                      </span>
                      <span className="font-manrope text-[16px] md:text-[18px] text-brand-accent font-medium">
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
                {content.officeHours.note && (
                  <div className="mt-[25px] pt-[25px] border-t border-brand-border/50">
                    <RichText
                      html={content.officeHours.note}
                      className="font-manrope text-[14px] md:text-[16px] text-white/70 leading-[22px] md:leading-[24px]"
                    />
                  </div>
                )}
              </div>

              {/* Call to Action Boxes */}
              <div className="space-y-[20px]">
                <CallBox
                  icon={Phone}
                  title={phoneLabel}
                  subtitle={phoneDisplay}
                  phone={phoneNumber}
                  className="w-full max-w-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
}
