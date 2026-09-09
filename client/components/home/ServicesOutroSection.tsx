import type { ServicesOutroContent } from "@site/lib/cms/homePageTypes";
import AnimatedSection from "@site/components/shared/AnimatedSection";
import RichText from "@site/components/shared/RichText";

interface ServicesOutroSectionProps {
  content: ServicesOutroContent;
}

export default function ServicesOutroSection({ content }: ServicesOutroSectionProps) {
  if (!content.text) return null;

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
        <AnimatedSection>
          <RichText
            html={content.text}
            className="font-manrope text-[16px] leading-8 text-brand-dark/75 md:text-[18px] [&_a]:font-semibold [&_a]:text-brand-accent [&_a]:underline [&_a]:underline-offset-4"
          />
        </AnimatedSection>
      </div>
    </section>
  );
}
