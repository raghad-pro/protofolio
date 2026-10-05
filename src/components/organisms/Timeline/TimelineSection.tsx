"use client";

import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { SectionHeader, TimelineItem } from "@/components/molecules";
import { SegmentedControl, type SegmentOption } from "@/components/ui";
import { richText } from "@/lib/rich-text";
import type { TimelineEntry, TimelineKind } from "@/modules/portfolio";

type Filter = "all" | TimelineKind;

interface TimelineSectionProps {
  entries: TimelineEntry[];
}

/**
 * Vertical, scroll-driven timeline. A glowing progress line "draws" itself
 * as the section scrolls through the viewport, and each node lights up while
 * it crosses the middle of the screen.
 */
export function TimelineSection({ entries }: TimelineSectionProps) {
  const t = useTranslations("timeline");
  const [filter, setFilter] = useState<Filter>("all");
  const trackRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start 65%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  const headTop = useTransform(progress, (v) => `${v * 100}%`);
  const headOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  const visible = filter === "all" ? entries : entries.filter((entry) => entry.kind === filter);

  const filters: SegmentOption<Filter>[] = (["all", "work", "education", "award"] as const).map((value) => ({
    value,
    label: t(`filters.${value}`),
  }));

  return (
    <section id="experience" aria-labelledby="timeline-title" className="ds-section overflow-hidden">
      <div className="ds-container">
        <div className="flex flex-col items-center gap-8">
          <SectionHeader
            id="timeline-title"
            align="center"
            eyebrow={t("eyebrow")}
            title={t.rich("title", richText)}
            description={t("description")}
          />
          <SegmentedControl
            options={filters}
            value={filter}
            onChange={setFilter}
            label={t("filters.label")}
            size="sm"
            className="max-w-full overflow-x-auto"
          />
        </div>

        <div className="relative mt-16">
          {/* Base rail */}
          <div
            aria-hidden
            className="absolute inset-y-0 start-5 w-px -translate-x-1/2 bg-ds-border-strong md:start-1/2 rtl:translate-x-1/2"
          />
          {/* Scroll-driven glowing progress */}
          <motion.div
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute inset-y-0 start-5 w-[3px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-ds-primary via-ds-primary to-ds-accent shadow-[0_0_14px_var(--ds-primary)] md:start-1/2 rtl:translate-x-1/2"
          />
          {/* Comet head riding the tip of the progress line */}
          <motion.div
            aria-hidden
            style={{ top: headTop, opacity: headOpacity }}
            className="absolute start-5 z-20 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ds-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--ds-primary)_25%,transparent),0_0_24px_6px_var(--ds-primary)] md:start-1/2 rtl:translate-x-1/2"
          />

          <ol ref={trackRef} className="relative">
            <AnimatePresence initial={false}>
              {visible.map((entry, index) => (
                <TimelineItem
                  key={entry.id}
                  side={index % 2 === 0 ? "start" : "end"}
                  kind={entry.kind}
                  kindLabel={t(`kinds.${entry.kind}`)}
                  title={t(`items.${entry.id}.title`)}
                  org={t(`items.${entry.id}.org`)}
                  period={t(`items.${entry.id}.period`)}
                  description={t(`items.${entry.id}.description`)}
                  tags={entry.tags}
                  current={entry.current}
                />
              ))}
            </AnimatePresence>
          </ol>
        </div>
      </div>
    </section>
  );
}
