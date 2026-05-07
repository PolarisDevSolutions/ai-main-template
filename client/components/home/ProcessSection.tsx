import type { ProcessContent } from "@/lib/homePageTypes";
import RichText from "@site/components/shared/RichText";
import AnimatedSection from "@site/components/shared/AnimatedSection";

interface ProcessSectionProps {
  content?: ProcessContent;
}

const defaultContent: ProcessContent = {
  sectionLabel: "– Process",
  headingLine1: "Kako radimo",
  headingLine2: "",
  steps: [
    {
      number: "01",
      title: "Step 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
    {
      number: "02",
      title: "Step 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
    {
      number: "03",
      title: "Step 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.",
    },
  ],
};

export default function ProcessSection({ content }: ProcessSectionProps) {
  const data = content || defaultContent;
  const steps = data.steps?.length ? data.steps : defaultContent.steps;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-16">
          {data.sectionLabel && (
            <p className="font-manrope text-[13px] font-semibold tracking-[0.2em] uppercase text-brand-accent mb-4">
              {data.sectionLabel}
            </p>
          )}
          <h2 className="font-grotesk text-[clamp(2rem,5vw,52px)] font-light leading-[1.1] text-brand-dark">
            {data.headingLine1}
            {data.headingLine2 && (
              <>
                <br />
                {data.headingLine2}
              </>
            )}
          </h2>
        </AnimatedSection>

        {/* Steps with connector line */}
        <div className="relative">
          {/* Horizontal connector line — desktop only */}
          <div
            className="hidden md:block absolute top-[40px] left-[calc(100%/6)] right-[calc(100%/6)] h-[1px] z-0"
            style={{
              backgroundImage:
                "linear-gradient(90deg, transparent 0%, rgb(212,175,55) 20%, rgb(212,175,55) 80%, transparent 100%)",
              opacity: 0.3,
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 relative z-10">
            {steps.map((step, index) => (
              <AnimatedSection
                key={index}
                delay={index * 0.12}
                className="flex flex-col items-center text-center px-8"
              >
                {/* Circle with number */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 border border-brand-accent/30 flex items-center justify-center bg-white">
                    <div className="w-16 h-16 bg-brand-dark flex items-center justify-center">
                      <span className="font-grotesk text-[22px] font-light text-brand-accent">
                        {step.number}
                      </span>
                    </div>
                  </div>
                  {/* Connector dots between steps — desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 left-full -translate-y-1/2 items-center gap-1 pl-4 w-full pointer-events-none">
                      {[0, 1, 2].map((dot) => (
                        <div
                          key={dot}
                          className="w-1 h-1 rounded-full bg-brand-accent/30"
                        />
                      ))}
                    </div>
                  )}
                </div>

                <h3 className="font-grotesk text-[20px] font-medium text-brand-dark mb-3">
                  {step.title}
                </h3>
                <RichText
                  html={step.description}
                  className="font-manrope text-[15px] leading-relaxed text-brand-dark/55"
                />

                {/* Vertical connector for mobile */}
                {index < steps.length - 1 && (
                  <div className="md:hidden w-[1px] h-8 bg-brand-accent/20 mt-8" />
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
