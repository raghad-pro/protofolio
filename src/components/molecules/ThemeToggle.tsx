"use client";

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { MoonIcon, SunIcon } from "@/assets/icons/icons";
import { IconButton } from "@/components/atoms";

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => { ready: Promise<void> };
};

/**
 * Theme switch with a circular "ripple" reveal that grows from the button,
 * powered by the View Transitions API (instant fallback elsewhere).
 */
export function ThemeToggle() {
  const t = useTranslations("common");
  const { resolvedTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = async () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const doc = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const apply = () => {
      // Apply synchronously so the transition snapshot captures the new theme.
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.style.colorScheme = next;
      flushSync(() => setTheme(next));
    };

    if (!doc.startViewTransition || reduceMotion || !buttonRef.current) {
      apply();
      return;
    }

    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    const transition = doc.startViewTransition(apply);
    await transition.ready;

    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      {
        duration: 650,
        easing: "cubic-bezier(0.65, 0, 0.35, 1)",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  };

  return (
    <IconButton ref={buttonRef} label={t("toggleTheme")} onClick={toggle} className="relative overflow-hidden">
      {/* Both icons render; CSS picks one so SSR markup never mismatches. */}
      <SunIcon className="size-[1.15rem] rotate-0 scale-100 transition-transform duration-500 dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute size-[1.15rem] rotate-90 scale-0 transition-transform duration-500 dark:rotate-0 dark:scale-100" />
    </IconButton>
  );
}
