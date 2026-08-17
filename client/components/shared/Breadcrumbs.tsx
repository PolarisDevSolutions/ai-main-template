import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Putanja stranice" className="border-b border-black/10 bg-white">
      <ol className="mx-auto flex w-[95%] max-w-[1400px] flex-wrap items-center gap-2 py-4 font-manrope text-[13px] md:w-[90%]">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronRight className="h-3.5 w-3.5 text-black/35" aria-hidden="true" />
              )}
              {item.href && !isCurrent ? (
                <Link to={item.href} className="text-black/60 transition-colors hover:text-brand-accent-dark">
                  {item.label}
                </Link>
              ) : (
                <span className="text-black" aria-current={isCurrent ? "page" : undefined}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
