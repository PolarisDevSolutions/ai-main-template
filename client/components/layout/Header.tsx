import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { useSiteSettings } from "@site/contexts/SiteSettingsContext";
import NavDropdown from "./NavDropdown";

export default function Header() {
  const { settings } = useSiteSettings();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const logoUrl = settings.logoUrl?.trim() || "";
  const logoAlt = settings.logoAlt?.trim() || settings.siteName?.trim() || "Logo";
  const ctaText = settings.headerCtaText?.trim() || "";
  const ctaUrl = settings.headerCtaUrl?.trim() || "/kontakt/";
  const navItems = [...(settings.navigationItems ?? [])].sort(
    (a, b) => (a.order ?? 0) - (b.order ?? 0),
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-brand-dark/90 backdrop-blur-md border-b border-brand-border/30 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[72px] lg:h-[80px]">
          {/* Logo */}
          <motion.div
            initial={false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link to="/" className="block">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={logoAlt}
                  className="h-[40px] w-auto max-w-[200px] object-contain"
                  height={40}
                />
              ) : (
                <span className="font-grotesk text-white text-[20px] font-semibold tracking-tight leading-none">
                  {settings.siteName || " "}
                </span>
              )}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => {
              const hasChildren = item.children && item.children.length > 0;
              const isActive =
                location.pathname === item.href ||
                location.pathname.startsWith(item.href + "/");

              if (hasChildren) {
                return <NavDropdown key={item.href} item={item} />;
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  target={item.openInNewTab ? "_blank" : undefined}
                  rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                  className="relative font-manrope text-[15px] text-white/80 hover:text-white transition-colors duration-200 py-1 group"
                >
                  {item.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1px] bg-brand-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {ctaText && (
              <Link
                to={ctaUrl}
                className="inline-flex items-center gap-2 font-manrope text-[14px] font-medium tracking-wide text-brand-accent border border-brand-accent px-5 py-2.5 transition-all duration-200 hover:bg-brand-accent hover:text-brand-dark"
              >
                {ctaText}
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden text-white p-2 hover:text-brand-accent transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-brand-dark/95 backdrop-blur-md border-t border-brand-border/30"
          >
            <nav className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-1">
              {navItems.map((item, i) => {
                const hasChildren = item.children && item.children.length > 0;
                const isActive = location.pathname === item.href;

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.2 }}
                  >
                    {hasChildren ? (
                      <MobileDropdownItem item={item} isActive={isActive} />
                    ) : (
                      <Link
                        to={item.href}
                        target={item.openInNewTab ? "_blank" : undefined}
                        rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                        className={`block font-manrope text-[17px] py-3 border-b border-brand-border/20 transition-colors ${
                          isActive
                            ? "text-brand-accent"
                            : "text-white/80 hover:text-white"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {ctaText && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.06 + 0.1 }}
                  className="mt-4"
                >
                  <Link
                    to={ctaUrl}
                    className="inline-flex items-center gap-2 font-manrope text-[15px] font-medium text-brand-accent border border-brand-accent px-6 py-3 w-full justify-center hover:bg-brand-accent hover:text-brand-dark transition-all duration-200"
                  >
                    {ctaText}
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface MobileDropdownItemProps {
  item: {
    label: string;
    href: string;
    openInNewTab?: boolean;
    children?: { label: string; href: string; openInNewTab?: boolean }[];
  };
  isActive: boolean;
}

function MobileDropdownItem({ item, isActive }: MobileDropdownItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center border-b border-brand-border/20">
        <Link
          to={item.href}
          className={`flex-1 font-manrope text-[17px] py-3 transition-colors ${
            isActive ? "text-brand-accent" : "text-white/80 hover:text-white"
          }`}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="p-2 text-white/60 hover:text-white transition-colors"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {open && (
        <div className="pl-4 py-1">
          {item.children?.map((child, idx) => (
            <Link
              key={idx}
              to={child.href}
              target={child.openInNewTab ? "_blank" : undefined}
              rel={child.openInNewTab ? "noopener noreferrer" : undefined}
              className="block font-manrope text-[15px] text-white/60 py-2 hover:text-brand-accent transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
