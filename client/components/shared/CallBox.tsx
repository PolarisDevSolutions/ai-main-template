import { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { isExternalHref, normalizeHref } from "@site/lib/linkUtils";

interface CallBoxProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  /** Internal route link (uses React Router) */
  link?: string;
  /** Raw phone digits — when provided, the entire box becomes a tel: link */
  phone?: string;
  className?: string;
  variant?: "light" | "dark" | "brand-dark-accent";
}

/** Strip all non-digit characters for use in tel: href */
function toRawDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export default function CallBox({
  icon: Icon,
  title,
  subtitle,
  link,
  phone,
  className = "",
  variant = "light",
}: CallBoxProps) {
  const textColor =
    variant === "brand-dark-accent"
      ? "text-brand-accent"
      : variant === "dark"
        ? "text-white"
        : "text-black";
  const textHoverColor =
    variant === "light"
      ? "group-hover:text-white transition-colors duration-300"
      : "";
  const boxClasses =
    variant === "brand-dark-accent"
      ? "bg-brand-dark hover:bg-black"
      : "bg-brand-accent hover:bg-brand-accent-dark";
  const iconWrapperClasses =
    variant === "brand-dark-accent"
      ? "bg-brand-accent p-3 mt-1 flex items-center justify-center shrink-0 group-hover:bg-white transition-colors duration-300"
      : "bg-white p-[15px] mt-1 flex items-center justify-center group-hover:bg-black transition-colors duration-300";
  const iconClasses =
    variant === "brand-dark-accent"
      ? "w-5 h-5 text-brand-dark transition-colors duration-300"
      : "w-8 h-8 [&>*]:fill-none [&>*]:stroke-black group-hover:[&>*]:stroke-white transition-colors duration-300";

  const content = (
    <div
      className={`p-[8px] w-full lg:w-[340px] cursor-pointer transition-all duration-300 group ${boxClasses} ${className}`}
    >
      <div className="flex items-start gap-4">
        <div className={iconWrapperClasses}>
          <Icon className={iconClasses} strokeWidth={1.5} />
        </div>
        <div className="flex-1">
          <h4
            className={`font-manrope text-[16px] md:text-[18px] leading-tight ${textColor} ${textHoverColor} pb-[10px]`}
          >
            {title}
          </h4>
          <p
            className={`font-manrope text-[18px] md:text-[24px] ${textColor} ${textHoverColor} leading-none whitespace-nowrap`}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );

  // Phone link takes priority over route link
  if (phone) {
    const digits = toRawDigits(phone);
    return <a href={`tel:${digits}`} className="block">{content}</a>;
  }

  if (link) {
    const normalizedLink = normalizeHref(link);
    if (isExternalHref(normalizedLink)) {
      return <a href={normalizedLink} className="block">{content}</a>;
    }
    return <Link to={normalizedLink} className="block">{content}</Link>;
  }

  return content;
}
