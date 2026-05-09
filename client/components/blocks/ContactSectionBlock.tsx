import { Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { ContentBlock } from "@site/lib/blocks";
import RichText from "@site/components/shared/RichText";

interface ContactSectionBlockProps {
  block: Extract<ContentBlock, { type: "contact-section" }>;
}

export default function ContactSectionBlock({ block }: ContactSectionBlockProps) {
  return (
    <div className="bg-white pt-[30px] md:pt-[54px] relative">
      <div className="max-w-[1600px] mx-auto w-[95%] md:w-[85%] lg:w-[80%] relative flex flex-col lg:flex-row gap-8 lg:gap-[3%]">
        {/* Left Side */}
        <div className="lg:w-[65.667%] relative">
          {/* Top Heading Section */}
          <div className="py-[4.2415%] relative w-full">
            <div className="relative w-full">
              <div className="mb-[10px]">
                <p className="font-manrope text-[18px] md:text-[24px] leading-tight md:leading-[36px] text-[#6b8d0c]">
                  {block.sectionLabel}
                </p>
              </div>
              <div>
                <h2 className="font-grotesk text-[32px] md:text-[48px] lg:text-[54px] leading-tight md:leading-[54px] text-black pb-[10px]">
                  {block.heading}
                </h2>
                <RichText
                  html={block.description}
                  className="font-manrope text-[16px] md:text-[24px] leading-[24px] md:leading-[36px] text-black"
                />
              </div>
            </div>
          </div>

          {/* Form Heading Panel */}
          <div
            className="relative w-full p-[30px]"
            style={{ backgroundColor: "rgba(29, 73, 70, 0.54)" }}
          >
            <div className="text-left">
              <h4 className="font-grotesk text-[22px] md:text-[28px] leading-tight md:leading-[36.4px] text-white pb-[10px]">
                {block.formHeading}
              </h4>
              <p className="font-manrope text-[16px] md:text-[20px] leading-[24px] md:leading-[28px] text-white font-light">
                Our intake team is available 24 hours a day, seven days a week
              </p>
              <div className="mt-[20px] md:mt-[30px] flex justify-start">
                <div className="bg-brand-accent p-[15px] inline-block">
                  <Scale
                    className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-black"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-[31.3333%] relative p-[30px] pt-[30px] shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <form
            name="contact-block"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            className="p-[5px] mx-auto"
          >
            <input type="hidden" name="form-name" value="contact-block" />
            <div className="space-y-[25px]">
              <div>
                <Input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  required
                  className="w-full h-[50px] bg-[#f7f7f7] border-[0.8px] border-[#c4c4c4] text-[#6b6b6b] text-[16px] px-[12px] py-[12px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  required
                  className="w-full h-[50px] bg-[#f7f7f7] border-[0.8px] border-[#c4c4c4] text-[#6b6b6b] text-[16px] px-[12px] py-[12px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address *"
                  required
                  className="w-full h-[50px] bg-[#f7f7f7] border-[0.8px] border-[#c4c4c4] text-[#6b6b6b] text-[16px] px-[12px] py-[12px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                  className="w-full h-[50px] bg-[#f7f7f7] border-[0.8px] border-[#c4c4c4] text-[#6b6b6b] text-[16px] px-[12px] py-[12px] rounded-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Message *"
                  required
                  className="w-full h-[200px] bg-[#f7f7f7] border-[0.8px] border-[#c4c4c4] text-[#6b6b6b] text-[16px] px-[12px] py-[12px] rounded-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full bg-brand-accent-dark text-brand-accent border-brand-accent font-manrope text-[22px] h-[50px] hover:bg-brand-accent hover:text-black transition-all duration-300 rounded-none"
                >
                  SUBMIT
                </Button>
              </div>
            </div>

            {/* Netlify Honeypot */}
            <div className="absolute invisible" aria-hidden="true">
              <label htmlFor="bot-field-block">
                If you are a human, leave this empty.
                <Input
                  type="text"
                  id="bot-field-block"
                  name="bot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  className="invisible"
                />
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
