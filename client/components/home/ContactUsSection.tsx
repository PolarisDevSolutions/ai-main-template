import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ContactContent } from "@site/lib/cms/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

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
  image: "",
  imageAlt: "",
};

const inputClass =
  "bg-white/5 border border-brand-border/30 text-white placeholder:text-white/30 h-[44px] text-[14px] font-manrope focus-visible:ring-0 focus-visible:border-brand-accent transition-colors duration-200 rounded-none";

export default function ContactUsSection({ content }: ContactUsSectionProps) {
  const data = content || defaultContent;

  return (
    <section className="bg-brand-dark py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left: image + text */}
          <AnimatedSection className="flex flex-col" direction="left">
            {data.image && (
              <div className="mb-10 relative">
                <img
                  src={data.image}
                  alt={data.imageAlt || ""}
                  className="w-full max-h-[480px] object-cover object-top"
                  loading="lazy"
                />
                {/* Gold accent strip */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-brand-accent" />
              </div>
            )}

            {data.sectionLabel && (
              <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-5">
                {data.sectionLabel}
              </p>
            )}

            <h2 className="font-grotesk text-[clamp(2rem,4vw,48px)] font-light text-white leading-[1.12] mb-6">
              {data.heading}
            </h2>

            {data.description && (
              <RichText
                html={data.description}
                className="font-manrope text-[16px] leading-relaxed text-white/55"
              />
            )}
          </AnimatedSection>

          {/* Right: form */}
          <AnimatedSection className="lg:py-4" delay={0.15}>
            <p className="font-grotesk text-[20px] font-light text-white mb-8">
              {data.formHeading}
            </p>

            <form
              name="contact"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contact" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-manrope text-[12px] tracking-widest uppercase text-white/40 mb-1.5">
                    Ime *
                  </label>
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="Vaše ime *"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block font-manrope text-[12px] tracking-widest uppercase text-white/40 mb-1.5">
                    Prezime *
                  </label>
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Vaše prezime *"
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className="block font-manrope text-[12px] tracking-widest uppercase text-white/40 mb-1.5">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  placeholder="vas@email.com *"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block font-manrope text-[12px] tracking-widest uppercase text-white/40 mb-1.5">
                  Telefon *
                </label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+381 ... *"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block font-manrope text-[12px] tracking-widest uppercase text-white/40 mb-1.5">
                  Poruka *
                </label>
                <Textarea
                  name="message"
                  placeholder="Kako vam možemo pomoći? *"
                  required
                  className={`${inputClass} h-auto min-h-[120px] resize-none`}
                />
              </div>

              <div className="absolute invisible" aria-hidden="true">
                <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full border border-brand-accent text-brand-accent bg-transparent hover:bg-brand-accent hover:text-brand-dark font-manrope text-[13px] tracking-widest uppercase h-[44px] transition-all duration-200"
                >
                  Pošalji poruku
                </Button>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
