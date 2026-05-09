import { Phone } from "lucide-react";
import MarketingHeroSection from "@site/components/shared/MarketingHeroSection";
import type { BlogHeroData } from "@site/hooks/useBlogContent";

interface BlogHeroProps {
  hero: BlogHeroData;
}

export default function BlogHero({ hero }: BlogHeroProps) {
  return <MarketingHeroSection content={hero} />;
}
