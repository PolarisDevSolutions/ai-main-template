import { Phone } from "lucide-react";
import type { PracticeAreaHeroContent } from "@site/lib/cms/practiceAreaPageTypes";
import MarketingHeroSection from "@site/components/shared/MarketingHeroSection";

interface PracticeAreaHeroProps {
  content: PracticeAreaHeroContent;
  headingTags?: Record<string, string>;
}

export default function PracticeAreaHero({
  content,
  headingTags,
}: PracticeAreaHeroProps) {
  return (
    <MarketingHeroSection
      content={content}
      headingTag={headingTags?.["hero.headline"]}
    />
  );
}
