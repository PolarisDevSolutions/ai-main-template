import { Phone } from "lucide-react";
import MarketingHeroSection from "@site/components/shared/MarketingHeroSection";
import type { ContentBlock } from "@site/lib/blocks";
import {
  createDefaultSharedHeroContent,
  normalizeSharedHeroContent,
} from "@site/lib/cms/sharedHero";

interface HeroBlockProps {
  block: Extract<ContentBlock, { type: "hero" }>;
}

export default function HeroBlock({ block }: HeroBlockProps) {
  const hero = normalizeSharedHeroContent(
    block,
    createDefaultSharedHeroContent({
      h1Title: "– Hero",
      headline: "Page headline",
      description: "<p>Enter a description here...</p>",
    }),
  );

  return <MarketingHeroSection content={hero} />;
}
