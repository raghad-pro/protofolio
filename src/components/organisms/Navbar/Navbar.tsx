"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { buttonClasses } from "@/components/atoms";
import { LocaleSwitcher, ThemeToggle } from "@/components/molecules";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function Navbar() {
  const t = useTranslations("nav");
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex h-[var(--ds-nav-height)] items-center"
    >
      <div className="ds-container">
        <nav
          aria-label={t("label")}
          className={cn(
            "flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 sm:px-4",
            scrolled ? "ds-glass shadow-ds" : "border border-transparent",
          )}
        >
          <a href="#home" className="flex items-center gap-2 font-bold tracking-tight">
            <span className="grid size-9 place-items-center rounded-full bg-ds-primary text-sm text-ds-primary-contrast shadow-ds-glow">
              R
            </span>
            <span className="hidden sm:inline">
              Raghad<span className="text-ds-primary">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="rounded-full px-4 py-2 text-sm font-medium text-ds-muted transition-colors hover:text-ds-fg"
                >
                  {t(section)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <LocaleSwitcher />
            <ThemeToggle />
            <a href="#contact" className={cn(buttonClasses("primary", "sm"), "ms-1 hidden sm:inline-flex")}>
              {t("contact")}
            </a>
          </div>
        </nav>
      </div>
    </motion.header>
  );
}
