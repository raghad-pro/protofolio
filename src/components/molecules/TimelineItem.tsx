"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { BriefcaseIcon, GraduationCapIcon, TrophyIcon, type IconComponent } from "@/assets/icons/icons";
import { Chip } from "@/components/atoms";
import { cn } from "@/lib/cn";
import type { TimelineKind } from "@/modules/portfolio";

const kindIcons: Record<TimelineKind, IconComponent> = {
  work: BriefcaseIcon,
  education: GraduationCapIcon,
  award: TrophyIcon,
};

export interface TimelineItemProps {
  kind: TimelineKind;
  kindLabel: string;
  title: string;
  org: string;
  period: string;
  description: string;
  tags: string[];
  current?: boolean;
  /** Which side of the center line the card sits on (≥ md screens). */
  side: "start" | "end";
}

/**
 * One milestone on the vertical timeline. Mobile: a single column with the
 * line on the inline-start edge. Desktop: cards alternate around a center
 * line. Logical properties (`start`/`end`) make it mirror correctly in RTL.
 */
export function TimelineItem({
  kind,
  kindLabel,
  title,
  org,
  period,
  description,
  tags,
  current,
  side,
}: TimelineItemProps) {
  const Icon = kindIcons[kind];
  const [active, setActive] = useState(false);

  return (
    <motion.li
      className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 md:grid-cols-[1fr_5rem_1fr] md:gap-x-0"
      onViewportEnter={() => setActive(true)}
      onViewportLeave={() => setActive(false)}
      viewport={{ margin: "-45% 0px -45% 0px" }}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Node on the line — lights up while the item crosses mid-viewport */}
      <div className="col-start-1 row-start-1 flex justify-center pt-5 md:col-start-2">
        <motion.span
          animate={active ? "on" : "off"}
          variants={{
            on: { scale: 1.08, boxShadow: "0 0 0 6px color-mix(in oklab, var(--ds-primary) 18%, transparent), 0 0 28px var(--ds-primary)" },
            off: { scale: 1, boxShadow: "0 0 0 0px transparent, 0 0 0px transparent" },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className={cn(
            "relative z-10 grid size-10 place-items-center rounded-full border transition-colors duration-500",
            active
              ? "border-ds-primary bg-ds-primary text-ds-primary-contrast"
              : "border-ds-border-strong bg-ds-surface text-ds-muted",
          )}
        >
          <Icon className="size-[1.1rem]" />
          {current && (
            <span aria-hidden className="absolute inset-0 animate-ds-pulse-ring rounded-full border border-ds-primary" />
          )}
        </motion.span>
      </div>

      {/* Card */}
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "group col-start-2 row-start-1 mb-10 md:mb-14",
          side === "start" ? "md:col-start-1" : "md:col-start-3",
        )}
      >
        <div
          className={cn(
            "ds-card relative p-5 transition-all duration-500 sm:p-6",
            active ? "border-ds-primary/35 shadow-ds-glow" : "hover:border-ds-border-strong hover:shadow-ds",
          )}
        >
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-semibold text-ds-primary">{kindLabel}</span>
            <span aria-hidden className="text-ds-muted md:hidden">•</span>
            {/* Period inline on mobile; beside the node on desktop */}
            <time className="font-mono text-ds-muted md:hidden">{period}</time>
          </div>
          <h3 className="ds-h3">{title}</h3>
          <p className="mt-1 text-sm font-medium text-ds-muted">{org}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-ds-muted">{description}</p>
          {tags.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <Chip>{tag}</Chip>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.article>

      {/* Period label on the opposite side (desktop only) */}
      <div
        className={cn(
          "row-start-1 hidden pt-7 md:block",
          side === "start" ? "md:col-start-3 md:ps-2" : "md:col-start-1 md:pe-2 md:text-end",
        )}
      >
        <time
          className={cn(
            "font-mono text-sm font-medium transition-colors duration-500",
            active ? "text-ds-primary" : "text-ds-muted",
          )}
        >
          {period}
        </time>
      </div>
    </motion.li>
  );
}
