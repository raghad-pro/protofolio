/**
 * Central image registry. Reference images through this map (never hard-coded
 * paths in components) so swapping an asset is a one-line change.
 * Files live in `/public/images`.
 */
export interface ImageAsset {
  src: string;
  width: number;
  height: number;
}

export const images = {
  /** Replace with a real portrait (e.g. `/images/raghad.webp`) when available. */
  avatar: { src: "/images/raghad-avatar.svg", width: 400, height: 480 },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof images;

/** Project screenshots, keyed by project id. */
export const projectScreenshots = {
  workflow: "/images/projects/workflow.png",
  "prowess-lift": "/images/projects/prowess-lift.webp",
  "skincare-store": "/images/projects/skincare-store.webp",
} as const;
