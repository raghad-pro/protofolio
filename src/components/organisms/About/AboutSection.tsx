"use client";

import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import type { ReactNode } from "react";
import { CheckIcon, CodeIcon, TrophyIcon } from "@/assets/icons/icons";
import { images } from "@/assets/images/images";
import { GlowOrb } from "@/components/atoms";
import { SectionHeader } from "@/components/molecules";
import { cn } from "@/lib/cn";
import { richText } from "@/lib/rich-text";

const DETAIL_KEYS = ["university", "major", "gpa", "focus", "languages"] as const;
const HIGHLIGHT_KEYS = ["pixel", "a11y", "perf", "team"] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Two-column About section. Direction is never hard-coded: the grid, logical
 * spacing (`ps-`/`pe-`) and inset utilities (`start-`/`end-`) all follow the
 * document `dir`, so the portrait sits left in English and right in Arabic.
 */
export function AboutSection() {
  const t = useTranslations("about");

  return (
    <section id="about" aria-labelledby="about-title" className="ds-section">
      <div className="ds-container grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* Visual (inline-start) */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto w-full max-w-md"
        >
          <GlowOrb className="inset-10 opacity-70" />
          <div className="ds-card relative aspect-[5/6] overflow-hidden rounded-ds-xl bg-[linear-gradient(160deg,var(--ds-surface-2),var(--ds-surface))]">
            <div aria-hidden className="ds-grid-bg absolute inset-0" />
            <Image
              src={images.avatar.src}
              width={images.avatar.width}
              height={images.avatar.height}
              alt={t("imageAlt")}
              className="relative mx-auto mt-[10%] h-[90%] w-auto object-contain"
            />
          </div>

          <FloatingCard
            className="-start-4 top-10 sm:-start-10"
            icon={<TrophyIcon className="size-5" />}
            label={t("floating.hackathon")}
            value={t("floating.hackathonValue")}
            delay={0.2}
          />
          <FloatingCard
            className="-end-3 bottom-12 sm:-end-8"
            icon={<CodeIcon className="size-5" />}
            label={t("floating.code")}
            value={t("floating.codeValue")}
            delay={0.35}
          />
        </motion.div>

        {/* Copy (inline-end) */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col gap-8"
        >
          <motion.div variants={reveal}>
            <SectionHeader id="about-title" eyebrow={t("eyebrow")} title={t.rich("title", richText)} />
          </motion.div>

          <motion.div variants={reveal} className="flex flex-col gap-4">
            <p className="text-lg font-medium leading-relaxed text-ds-fg">{t("lead")}</p>
            <p className="leading-relaxed text-ds-muted">{t("body1")}</p>
            <p className="leading-relaxed text-ds-muted">{t("body2")}</p>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2">
            <motion.div variants={reveal} className="ds-card flex flex-col gap-3 p-5">
              <h3 className="text-sm font-semibold text-ds-fg">{t("details.title")}</h3>
              <dl className="flex flex-col gap-3">
                {DETAIL_KEYS.map((key) => (
                  <div
                    key={key}
                    className="flex items-baseline justify-between gap-4 border-t border-ds-border pt-3 text-sm"
                  >
                    <dt className="text-ds-muted">{t(`details.${key}`)}</dt>
                    <dd className="text-end font-medium text-ds-fg">{t(`details.${key}Value`)}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>

            <motion.div variants={reveal} className="ds-card flex flex-col gap-3 p-5">
              <h3 className="text-sm font-semibold text-ds-fg">{t("highlights.title")}</h3>
              <ul className="flex flex-col gap-3">
                {HIGHLIGHT_KEYS.map((key) => (
                  <li key={key} className="flex items-start gap-3 text-sm text-ds-muted">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-ds-primary/15 text-ds-primary">
                      <CheckIcon className="size-3" />
                    </span>
                    {t(`highlights.${key}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface FloatingCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  className: string;
  delay: number;
}

function FloatingCard({ icon, label, value, className, delay }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 18 }}
      className={cn("absolute z-10", className)}
    >
      {/* Inner element floats; the outer one owns the entrance transform. */}
      <div
        className="ds-glass flex animate-ds-float items-center gap-3 rounded-ds-md px-4 py-3 shadow-ds"
        style={{ animationDelay: `${delay * 4}s` }}
      >
        <span className="grid size-10 place-items-center rounded-full bg-ds-primary text-ds-primary-contrast shadow-ds-glow">
          {icon}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-xs text-ds-muted">{label}</span>
          <span className="text-sm font-bold text-ds-fg">{value}</span>
        </span>
      </div>
    </motion.div>
  );
}
