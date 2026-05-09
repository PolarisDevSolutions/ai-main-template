import React from "react";
import { Facebook, Instagram, Youtube, Linkedin, Twitter, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import RichText from "@site/components/shared/RichText";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";

const SOCIAL_ICON_MAP: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  facebook: Facebook,
  instagram: Instagram,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
};

export default function Footer() {
  const { settings } = useSiteSettings();

  const logoUrl = settings.logoUrl?.trim() || "";
  const logoAlt = settings.logoAlt?.trim() || settings.siteName?.trim() || "Logo";
  const phoneNumber = settings.phoneNumber?.trim() || "";
  const phoneDisplay = settings.phoneDisplay?.trim() || "";
  const phoneLabel = settings.phoneAvailability?.trim() || "";
  const copyrightRaw = settings.copyrightText?.trim() || "";
  const copyrightText = copyrightRaw.replace(/\{year\}/gi, String(new Date().getFullYear()));
  const resourceLinks = settings.footerAboutLinks ?? [];
  const practiceLinks = settings.footerPracticeLinks ?? [];
  const footerTaglineHtml = settings.footerTaglineHtml || "";
  const col1Label = settings.footerColumn1Label?.trim() || "Resursi";
  const col2Label = settings.footerColumn2Label?.trim() || "Usluge";
  const col4Label = settings.footerColumn4Label?.trim() || "";
  const footerLogoText = settings.footerLogoText?.trim() || "";
  const footerColumn4Content = settings.footerColumn4Content?.trim() || "";
  const enabledSocialLinks = (settings.socialLinks ?? []).filter((s) => s.enabled);

  return (
    <footer className="bg-brand-dark">
      {/* Tagline + CTA Row */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-16">
          {/* Tagline */}
          <div className="flex-1">
            {footerTaglineHtml ? (
              <div
                className="font-grotesk text-[clamp(2rem,5vw,52px)] font-light leading-[1.15] text-white [&_span]:text-brand-accent"
                dangerouslySetInnerHTML={{ __html: footerTaglineHtml }}
              />
            ) : (
              <p className="font-grotesk text-[clamp(2rem,5vw,52px)] font-light leading-[1.15] text-white">
                <span className="text-brand-accent">Vaša vizija.</span>
                <br />
                Naša misija.
              </p>
            )}
          </div>

          {/* Phone CTA */}
          {phoneDisplay && (
            <div className="lg:w-[300px] shrink-0">
              <a
                href={`tel:${phoneNumber.replace(/\D/g, "")}`}
                className="block bg-brand-accent p-5 group hover:bg-brand-accent-dark transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-brand-dark p-3 shrink-0 group-hover:bg-white transition-colors duration-300">
                    <Phone
                      className="w-6 h-6 text-brand-accent group-hover:text-brand-dark transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    {phoneLabel && (
                      <p className="font-manrope text-[13px] text-brand-dark/70 group-hover:text-brand-dark transition-colors duration-300 mb-0.5">
                        {phoneLabel}
                      </p>
                    )}
                    <p className="font-grotesk text-[26px] font-medium text-brand-dark leading-tight group-hover:text-brand-dark transition-colors duration-300">
                      {phoneDisplay}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-brand-border/30" />

      {/* Links + Map Row */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo + Text Column */}
          <div className="flex flex-col gap-6">
            <Link to="/" className="block">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={logoAlt}
                  className="h-[36px] w-auto max-w-[160px] object-contain"
                  height={36}
                />
              ) : (
                <span className="font-grotesk text-white text-[20px] font-semibold leading-none">
                  {settings.siteName || " "}
                </span>
              )}
            </Link>

            {footerLogoText && (
              <p className="whitespace-pre-line font-manrope text-[14px] text-white/50 leading-relaxed max-w-[240px]">
                {footerLogoText}
              </p>
            )}

            {/* Social Icons */}
            {enabledSocialLinks.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                {enabledSocialLinks.map((social) => {
                  const Icon = SOCIAL_ICON_MAP[social.platform];
                  if (!Icon) return null;
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 border border-brand-border/60 flex items-center justify-center text-white/60 hover:border-brand-accent hover:text-brand-accent transition-all duration-200"
                      title={social.platform}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Column 1 Links */}
          <div>
            <h4 className="font-grotesk text-[13px] font-semibold tracking-widest uppercase text-brand-accent mb-5">
              {col1Label}
            </h4>
            {resourceLinks.length > 0 ? (
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href || "#"}
                      className="font-manrope text-[15px] text-white/60 hover:text-brand-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Column 2 Links */}
          <div>
            <h4 className="font-grotesk text-[13px] font-semibold tracking-widest uppercase text-brand-accent mb-5">
              {col2Label}
            </h4>
            {practiceLinks.length > 0 ? (
              <ul className="space-y-3">
                {practiceLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href || "/"}
                      className="font-manrope text-[15px] text-white/60 hover:text-brand-accent transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* Column 4 Content */}
          {(col4Label || footerColumn4Content) && (
            <div>
              {col4Label && (
                <h4 className="font-grotesk text-[13px] font-semibold tracking-widest uppercase text-brand-accent mb-5">
                  {col4Label}
                </h4>
              )}
              {footerColumn4Content && (
                <RichText
                  html={footerColumn4Content}
                  className="font-manrope text-[15px] leading-relaxed text-white/60 [&_a]:text-white [&_a]:underline-offset-4 hover:[&_a]:text-brand-accent [&_a]:underline [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:text-white [&_ul]:space-y-2 [&_ol]:space-y-2 [&_li]:ml-4"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-brand-border/20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          {copyrightText ? (
            <p className="font-manrope text-[13px] text-white/40 text-center md:text-left">
              {copyrightText}
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
