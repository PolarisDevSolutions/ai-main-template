import { Phone, Calendar } from "lucide-react";
import { useGlobalPhone } from "@site/contexts/SiteSettingsContext";
import CallBox from "@site/components/shared/CallBox";
import RichText from "@site/components/shared/RichText";

interface SharedCtaButton {
  label: string;
  sublabel: string;
  link: string;
}

interface SharedCtaContent {
  heading: string;
  description: string;
  secondaryButton: SharedCtaButton;
}

interface SharedCtaSectionProps {
  content: SharedCtaContent;
}

export default function SharedCtaSection({ content }: SharedCtaSectionProps) {
  const { phoneNumber, phoneDisplay, phoneLabel } = useGlobalPhone();

  return (
    <div className="bg-brand-accent py-[40px] md:py-[60px]">
      <div className="max-w-[2560px] mx-auto w-[95%] md:w-[90%] lg:w-[80%]">
        <div className="text-center mb-[30px] md:mb-[40px]">
          <h2 className="font-grotesk text-[36px] md:text-[48px] lg:text-[60px] leading-tight text-black pb-[15px]">
            {content.heading}
          </h2>
          <RichText
            html={content.description}
            className="font-manrope text-[18px] md:text-[22px] leading-[26px] md:leading-[32px] text-black/80"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center md:items-start">
          <CallBox
            icon={Phone}
            title={phoneLabel}
            subtitle={phoneDisplay}
            phone={phoneNumber}
            variant="brand-dark-accent"
          />
          <CallBox
            icon={Calendar}
            title={content.secondaryButton.label}
            subtitle={content.secondaryButton.sublabel}
            link={content.secondaryButton.link}
            variant="brand-dark-accent"
          />
        </div>
      </div>
    </div>
  );
}
