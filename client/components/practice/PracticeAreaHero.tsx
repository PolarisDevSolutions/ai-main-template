import { Phone } from "lucide-react";
import type { PracticeAreaHeroContent } from "@site/lib/cms/practiceAreaPageTypes";
import MarketingHeroSection from "@site/components/shared/MarketingHeroSection";

interface PracticeAreaHeroProps {
  content: PracticeAreaHeroContent;
}

export default function PracticeAreaHero({ content }: PracticeAreaHeroProps) {
  return <MarketingHeroSection content={content} />;
}
