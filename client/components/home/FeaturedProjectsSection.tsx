import { ArrowUpRight } from "lucide-react";
import type { FeaturedProjectsContent } from "@site/lib/cms/homePageTypes";
import AnimatedSection from "@site/components/shared/AnimatedSection";
import RichText from "@site/components/shared/RichText";

interface FeaturedProjectsSectionProps {
  content: FeaturedProjectsContent;
}

export default function FeaturedProjectsSection({ content }: FeaturedProjectsSectionProps) {
  if (!content.enabled || content.projects.length === 0) return null;

  return (
    <section className="bg-brand-dark py-20 md:py-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <AnimatedSection className="mb-12 max-w-[760px]">
          {content.sectionLabel && (
            <p className="mb-4 font-manrope text-[13px] font-semibold uppercase tracking-[0.2em] text-brand-accent">
              {content.sectionLabel}
            </p>
          )}
          <h2 className="font-grotesk text-[clamp(2rem,5vw,52px)] font-light leading-[1.1] text-white">
            {content.heading}
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {content.projects.map((project, index) => {
            const card = (
              <article className="h-full border border-brand-border/30 bg-brand-card/60 p-6 transition-colors hover:border-brand-accent/50">
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="mb-6 aspect-[4/3] w-full object-cover"
                    loading="lazy"
                  />
                )}
                {project.industry && (
                  <p className="mb-3 font-manrope text-[12px] uppercase tracking-[0.18em] text-brand-accent">
                    {project.industry}
                  </p>
                )}
                <h3 className="mb-4 font-grotesk text-[26px] font-medium text-white">{project.name}</h3>
                {project.goal && <RichText html={project.goal} className="mb-3 font-manrope text-[14px] leading-6 text-white/65" />}
                {project.work && <RichText html={project.work} className="font-manrope text-[14px] leading-6 text-white/65" />}
                {project.result && (
                  <div className="mt-5 border-t border-brand-border/20 pt-5">
                    <RichText html={project.result} className="font-manrope text-[14px] leading-6 text-white/80" />
                    {project.measurementPeriod && <p className="mt-2 font-manrope text-[12px] text-white/45">{project.measurementPeriod}</p>}
                  </div>
                )}
                {project.link && <ArrowUpRight className="mt-5 h-5 w-5 text-brand-accent" />}
              </article>
            );

            return (
              <AnimatedSection key={`${project.name}-${index}`} delay={index * 0.1}>
                {project.link ? <a href={project.link}>{card}</a> : card}
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
