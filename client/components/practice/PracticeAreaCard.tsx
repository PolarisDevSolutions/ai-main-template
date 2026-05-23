import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight, type LucideIcon } from "lucide-react";
import RichText from "@site/components/shared/RichText";

interface PracticeAreaCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  link?: string;
  linkLabel?: string;
}

export default function PracticeAreaCard({
  icon: Icon,
  title,
  description,
  image,
  imageAlt,
  link,
  linkLabel,
}: PracticeAreaCardProps) {
  const hasLink = Boolean(link);
  const cardClassName = "relative min-h-[450px] overflow-hidden group bg-brand-card border border-brand-border transition-all duration-300 hover:border-brand-accent";
  const content = (
    <>
      {/* Background Image */}
      <div
        role="img"
        aria-label={imageAlt || title}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
        style={{
          backgroundImage: `url(${image})`,
        }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90 transition-all duration-500 group-hover:from-brand-accent-dark/40 group-hover:via-brand-accent-dark/70 group-hover:to-brand-dark/95"></div>

      <div className="relative flex h-full flex-col p-[25px] md:p-[30px]">
        <div className="flex flex-col gap-8">
          <div className="flex justify-start">
            <div className="inline-flex items-center justify-center bg-brand-accent p-[15px] transition-all duration-300 group-hover:bg-white">
              <Icon
                className="h-[30px] w-[30px] text-black md:h-[35px] md:w-[35px]"
                strokeWidth={1.5}
              />
            </div>
          </div>

          <div>
            <h3 className="pb-[15px] font-grotesk text-[28px] leading-tight text-white transition-all duration-300 group-hover:text-brand-accent md:text-[32px]">
              {title}
            </h3>
            <RichText
              html={description}
              className="font-manrope text-[14px] leading-[22px] text-white/90 md:text-[16px] md:leading-[24px] [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1 [&_li:last-child]:mb-0"
            />
          </div>
        </div>

        {hasLink && linkLabel && (
          <div className="mt-auto pt-6">
            <div className="flex items-center gap-2 text-brand-accent transition-colors duration-300 group-hover:text-white">
              <span className="font-manrope text-[14px] md:text-[16px]">
                {linkLabel}
              </span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        )}
      </div>
    </>
  );

  if (hasLink) {
    return (
      <Link to={link!} className={cardClassName}>
        {content}
      </Link>
    );
  }

  return <div className={cardClassName}>{content}</div>;
}
