import DynamicHeading from "@site/components/shared/DynamicHeading";

interface LogoMarqueeProps {
  title?: string;
  logos: Array<{ src: string; alt: string }>;
  headingTag?: string;
}

export default function LogoMarquee({
  title,
  logos,
  headingTag,
}: LogoMarqueeProps) {
  if (logos.length === 0) {
    return null;
  }

  return (
    <section className="w-full overflow-hidden border-y border-brand-dark/8 bg-white py-8">
      {title && (
        <div className="px-6 pb-6 lg:px-10">
          <DynamicHeading
            tag={headingTag}
            defaultTag="h3"
            className="text-center font-grotesk text-[clamp(0.95rem,1.6vw,18px)] font-medium uppercase leading-tight tracking-[0.24em] text-brand-dark"
          >
            {title}
          </DynamicHeading>
        </div>
      )}
      <div
        className="flex animate-marquee whitespace-nowrap"
        style={{ width: "max-content" }}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.src}-${index}`}
            className="inline-flex h-[88px] w-[190px] shrink-0 items-center justify-center px-8"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              width={150}
              height={48}
              className="h-[48px] w-[150px] object-contain opacity-50 grayscale transition-opacity duration-200 hover:opacity-80 hover:grayscale-0"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
