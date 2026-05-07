import type { ProcessContent } from "@/lib/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface ProcessSectionProps {
  content?: ProcessContent;
}

const defaultContent: ProcessContent = {
  sectionLabel: "– Process",
  headingLine1: "Get Started Easily.",
  headingLine2: "Take a Look at The Steps",
  steps: [
    {
      number: "01",
      title: "Step 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
    {
      number: "02",
      title: "Step 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
    {
      number: "03",
      title: "Step 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
  ],
};

export default function ProcessSection({ content }: ProcessSectionProps) {
  const data = content || defaultContent;
  const steps = data.steps || defaultContent.steps;

  return (
    <section className="bg-brand-dark py-20 md:py-28">
      <AnimatedSection className="max-w-[1400px] mx-auto px-6 lg:px-10 text-center mb-14">
        {data.sectionLabel && (
          <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
            {data.sectionLabel}
          </p>
        )}
        <h2 className="font-grotesk text-[clamp(2rem,5vw,52px)] font-light leading-[1.1] text-white">
          {data.headingLine1}
          {data.headingLine2 && (
            <><br />{data.headingLine2}</>
          )}
        </h2>
      </AnimatedSection>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((step, index) => (
          <AnimatedSection key={index} delay={index * 0.1} className="bg-brand-card border border-brand-border/30 p-8">
            <p className="font-grotesk text-[36px] font-light text-brand-accent mb-4">{step.number}</p>
            <h3 className="font-grotesk text-[22px] font-medium text-white mb-4">{step.title}</h3>
            <RichText
              html={step.description}
              className="font-manrope text-[15px] leading-relaxed text-white/60"
            />
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
