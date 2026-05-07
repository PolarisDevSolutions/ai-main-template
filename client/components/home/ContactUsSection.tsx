import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Scale } from "lucide-react";
import type { ContactContent } from "@/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";

interface ContactUsSectionProps {
  content?: ContactContent;
}

const defaultContent: ContactContent = {
  sectionLabel: "– Kontaktirajte nas",
  heading: "Zakažite besplatnu konsultaciju danas.",
  description: "",
  phone: "",
  phoneLabel: "",
  address: "",
  formHeading: "Kontaktirajte nas danas",
};

const inputClass =
  "bg-[#f7f7f7] border border-[#e0e0e0] text-[#333] placeholder:text-[#999] h-[46px] text-[15px] font-manrope focus-visible:ring-0 focus-visible:border-brand-accent transition-colors duration-200 rounded-none";

export default function ContactUsSection({ content }: ContactUsSectionProps) {
  const data = content || defaultContent;
  const { settings } = useSiteSettings();

  const displayAddress =
    data.address ||
    [settings.addressLine1, settings.addressLine2].filter(Boolean).join(", ");

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Side: Text + Image */}
          <AnimatedSection className="flex-1 min-w-0" direction="left">
            <div className="mb-8">
              {data.sectionLabel && (
                <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
                  {data.sectionLabel}
                </p>
              )}
              <h2 className="font-grotesk text-[clamp(2rem,4vw,48px)] font-light text-brand-dark leading-[1.15] mb-6">
                {data.heading}
              </h2>
              {data.description && (
                <RichText
                  html={data.description}
                  className="font-manrope text-[16px] leading-relaxed text-brand-dark/70"
                />
              )}
              {displayAddress && (
                <p className="font-manrope text-[15px] text-brand-dark/60 mt-4">
                  {displayAddress}
                </p>
              )}
            </div>

            {data.image && (
              <div className="relative">
                <img
                  src={data.image}
                  alt={data.imageAlt || "Kontaktirajte nas"}
                  className="w-full max-w-[420px] h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute bottom-6 right-0 bg-brand-dark p-5 flex items-center gap-3">
                  <div className="bg-brand-accent p-3">
                    <Scale className="w-6 h-6 text-brand-dark" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-grotesk text-[16px] text-white font-medium leading-tight">
                      {data.formHeading}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!data.image && (
              <div className="bg-brand-dark p-6 flex items-center gap-4 max-w-[420px]">
                <div className="bg-brand-accent p-4 shrink-0">
                  <Scale className="w-8 h-8 text-brand-dark" strokeWidth={1.5} />
                </div>
                <p className="font-grotesk text-[18px] text-white font-light leading-snug">
                  {data.formHeading}
                </p>
              </div>
            )}
          </AnimatedSection>

          {/* Right Side: Form */}
          <AnimatedSection className="lg:w-[420px] shrink-0" delay={0.15}>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  name="firstName"
                  placeholder="Ime *"
                  required
                  className={inputClass}
                />
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Prezime *"
                  required
                  className={inputClass}
                />
              </div>

              <Input
                type="email"
                name="email"
                placeholder="Email adresa *"
                required
                className={inputClass}
              />

              <Input
                type="tel"
                name="phone"
                placeholder="Broj telefona"
                className={inputClass}
              />

              <Textarea
                name="message"
                placeholder="Poruka *"
                required
                className={`${inputClass} h-auto min-h-[140px] resize-y`}
              />

              <div className="absolute invisible" aria-hidden="true">
                <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
              </div>

              <Button
                type="submit"
                className="w-full border border-brand-accent text-brand-accent bg-transparent hover:bg-brand-accent hover:text-brand-dark font-manrope text-[14px] tracking-widest uppercase h-[46px] transition-all duration-200"
              >
                Pošalji
              </Button>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
