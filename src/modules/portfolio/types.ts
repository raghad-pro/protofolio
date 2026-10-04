/**
 * Domain types for portfolio content. Display copy (titles, descriptions…)
 * lives in `src/i18n/messages/*.json`, keyed by each entity's `id`, so the
 * same data powers every locale.
 */

export type TechId = "react" | "next" | "typescript" | "tailwind" | "vite" | "git";

export interface TechItem {
  id: TechId;
  name: string;
  /** Brand tint used for the orbit badge glow. */
  color: string;
}

export type TimelineKind = "work" | "education" | "award";

export interface TimelineEntry {
  id: string;
  kind: TimelineKind;
  tags: string[];
  /** Marks the entry as current/ongoing (adds a live pulse on the node). */
  current?: boolean;
}

export interface Project {
  id: string;
  /** Brand color that tints the card cover backdrop. */
  accent: string;
  stack: string[];
  /** Number of feature bullets available in the message catalog. */
  featureCount: number;
  featured?: boolean;
  /** Screenshot shown on the card and on the 3D laptop in the preview modal. */
  screenshot: string;
  liveUrl?: string;
  repoUrl?: string;
}
