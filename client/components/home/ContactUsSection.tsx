import ContactForm from "@site/components/home/ContactForm";
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

            <ContactForm />
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
