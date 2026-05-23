import RichText from "@site/components/shared/RichText";

interface SharedWhyChooseItem {
  number: string;
  title: string;
  description: string;
}

interface SharedWhyChooseContent {
  sectionLabel: string;
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  items: SharedWhyChooseItem[];
}

interface SharedWhyChooseSectionProps {
  content: SharedWhyChooseContent;
}

export default function SharedWhyChooseSection({
  content,
}: SharedWhyChooseSectionProps) {
  return (
    <div className="bg-white pt-[30px] md:pt-[40px] pb-[40px] md:pb-[60px]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-stretch">
          <div>
            <div className="mb-4">
              <p className="font-manrope text-[13px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
                {content.sectionLabel}
              </p>
            </div>
            <h2 className="mb-6 font-grotesk text-[clamp(2rem,4vw,48px)] font-semibold leading-[1.15] text-brand-dark">
              {content.heading}
            </h2>
            <RichText
              html={content.description}
              className="font-manrope text-[16px] md:text-[18px] leading-[24px] md:leading-[28px] text-black mb-[30px]"
            />
            {content.image && (
              <div className="hidden lg:flex justify-center">
                <img
                  src={content.image}
                  alt={content.imageAlt || "Why Choose Us"}
                  className="h-auto w-full max-w-[400px] object-cover"
                  width={400}
                  height={300}
                  loading="lazy"
                />
              </div>
            )}
          </div>

          <div className="flex h-full flex-col justify-center gap-5 md:gap-6">
            {content.items.map((feature, index) => (
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
  );
}
