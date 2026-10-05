import type { SVGProps } from "react";
import type { SocialId } from "@/config/site";
import type { TechId } from "@/modules/portfolio/types";

/**
 * Icon library. Every icon is a plain React component that inherits
 * `currentColor` and accepts standard SVG props (size via `className`).
 * Brand marks are simplified from Simple Icons (CC0).
 */
export type IconProps = SVGProps<SVGSVGElement>;
export type IconComponent = (props: IconProps) => React.JSX.Element;

const Stroke = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    width="1em"
    height="1em"
    {...props}
  >
    {children}
  </svg>
);

const Fill = ({ children, ...props }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    width="1em"
    height="1em"
    {...props}
  >
    {children}
  </svg>
);

/* ---------------------------------------------------------------- UI icons */

export const SunIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </Stroke>
);

export const MoonIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </Stroke>
);

export const GlobeIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </Stroke>
);

export const MailIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Stroke>
);

export const CloseIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Stroke>
);

export const ArrowRightIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </Stroke>
);

export const ArrowUpRightIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Stroke>
);

export const PlayIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M6 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L7.5 3.64A1 1 0 0 0 6 4.5z" />
  </Stroke>
);

export const BriefcaseIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </Stroke>
);

export const GraduationCapIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0z" />
    <path d="M22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
  </Stroke>
);

export const TrophyIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
  </Stroke>
);

export const SparklesIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z" />
  </Stroke>
);

export const CheckIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Stroke>
);

export const CodeIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </Stroke>
);

export const CubeIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <path d="M3.3 7 12 12l8.7-5M12 22V12" />
  </Stroke>
);

export const MonitorIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </Stroke>
);

export const TabletIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M12 18h.01" />
  </Stroke>
);

export const PhoneIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <rect x="6" y="2" width="12" height="20" rx="2" />
    <path d="M12 18h.01" />
  </Stroke>
);

export const MapPinIcon: IconComponent = (p) => (
  <Stroke {...p}>
    <path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </Stroke>
);

/* ------------------------------------------------------------- Brand icons */

export const GitHubIcon: IconComponent = (p) => (
  <Fill {...p}>
    <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57L9 21.07c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.08-.74.09-.73.09-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
  </Fill>
);

export const LinkedInIcon: IconComponent = (p) => (
  <Fill {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </Fill>
);

export const InstagramIcon: IconComponent = (p) => (
  <Fill {...p}>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
  </Fill>
);

export const ReactIcon: IconComponent = (p) => (
  <svg viewBox="-11.5 -10.23 23 20.46" aria-hidden="true" focusable="false" width="1em" height="1em" {...p}>
    <circle r="2.05" fill="currentColor" />
    <g stroke="currentColor" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

export const NextIcon: IconComponent = (p) => (
  <Fill {...p}>
    <path d="M11.57 0c-.05 0-.22.02-.37.03C7.7.35 4.43 2.24 2.36 5.14a11.88 11.88 0 0 0-2.12 5.25c-.1.73-.11.95-.11 1.94 0 .99.01 1.2.11 1.94.67 4.6 3.94 8.46 8.37 9.89.8.26 1.63.43 2.58.54.37.04 1.97.04 2.34 0 1.64-.18 3.03-.59 4.4-1.29.21-.11.25-.14.22-.16l-1.85-2.48-1.95-2.63-2.44-3.6a345.6 345.6 0 0 0-2.46-3.6c-.01 0-.02 1.6-.02 3.55-.01 3.41-.01 3.55-.06 3.63a.5.5 0 0 1-.24.25c-.08.04-.15.05-.5.05h-.41l-.11-.07a.44.44 0 0 1-.16-.18l-.05-.1.01-4.75.01-4.75.07-.1a.65.65 0 0 1 .17-.14c.1-.05.13-.05.54-.05.48 0 .56.02.69.16.03.04 1.33 2 2.89 4.36l4.75 7.18 1.9 2.88.1-.06a12.4 12.4 0 0 0 2.47-2.17 11.98 11.98 0 0 0 2.83-6.15c.1-.73.11-.95.11-1.94 0-.99-.01-1.2-.11-1.94-.67-4.6-3.94-8.46-8.37-9.89a12.6 12.6 0 0 0-2.55-.54c-.23-.02-1.81-.05-2.01-.03zm4.98 7.39a.48.48 0 0 1 .24.28c.02.06.02 1.38.02 4.34l-.01 4.25-.75-1.15-.75-1.15v-3.1c0-2 .01-3.12.03-3.18a.48.48 0 0 1 .23-.3c.1-.05.13-.05.5-.05.35 0 .41 0 .49.04z" />
  </Fill>
);

export const TypeScriptIcon: IconComponent = (p) => (
  <Fill {...p}>
    <path d="M1.13 0C.5 0 0 .5 0 1.13v21.74C0 23.5.5 24 1.13 24h21.74c.62 0 1.13-.5 1.13-1.13V1.13C24 .5 23.5 0 22.87 0zm17.36 9.57c.61 0 1.15.04 1.62.11.47.07.91.19 1.32.33v2.75a4 4 0 0 0-.65-.37 5.2 5.2 0 0 0-1.44-.41 4.4 4.4 0 0 0-.66-.05c-.29 0-.55.03-.79.08-.23.06-.43.13-.59.23a1.1 1.1 0 0 0-.38.36.85.85 0 0 0-.13.47c0 .19.05.36.15.51.1.15.24.29.42.42.18.14.4.27.66.4.26.13.55.26.88.4.45.19.85.39 1.21.6.36.21.66.45.92.71.25.26.45.57.58.91.14.34.2.74.2 1.19 0 .62-.12 1.15-.35 1.57-.24.43-.56.77-.96 1.04-.4.26-.87.45-1.4.56a8.1 8.1 0 0 1-1.69.17c-.62 0-1.21-.05-1.77-.16a5.3 5.3 0 0 1-1.45-.47v-2.94a4.8 4.8 0 0 0 2.98 1.12c.31 0 .58-.03.81-.08.23-.06.42-.13.58-.23.15-.1.27-.22.34-.36a.96.96 0 0 0-.07-1.02 1.8 1.8 0 0 0-.44-.43 4.6 4.6 0 0 0-.66-.38 21 21 0 0 0-.83-.37 4.2 4.2 0 0 1-1.69-1.16 2.53 2.53 0 0 1-.56-1.65c0-.59.12-1.1.36-1.52.23-.42.55-.77.95-1.04.4-.27.86-.47 1.38-.6.53-.13 1.08-.19 1.66-.19zm-15.11.24h7.97v2.28H8.48v10.15H5.68V12.09H3.38z" />
  </Fill>
);

export const TailwindIcon: IconComponent = (p) => (
  <Fill {...p}>
    <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.12 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.47 6 12 6zm-5 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.53 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.47 12 7 12z" />
  </Fill>
);

export const ViteIcon: IconComponent = (p) => (
  <Fill {...p}>
    <path d="m8.29 2.39 13.15-.03a.6.6 0 0 1 .54.88L12.67 21.1a.6.6 0 0 1-1.06 0L2.07 3.25a.6.6 0 0 1 .63-.88l5.59.99v-.01zm7.63-1.38L10.75 2a.31.31 0 0 0-.25.29l-.32 5.4a.31.31 0 0 0 .38.32l1.44-.33c.22-.05.42.14.37.37l-.43 2.1c-.05.23.17.43.39.36l.89-.27c.22-.07.44.13.39.36l-.68 3.28c-.04.21.24.32.36.14l.08-.12 4.24-8.46a.31.31 0 0 0-.34-.44l-1.49.29a.31.31 0 0 1-.36-.39l.97-3.37a.31.31 0 0 0-.36-.39z" />
  </Fill>
);

export const GitIcon: IconComponent = (p) => (
  <Fill {...p}>
    <path d="M23.55 10.93 13.07.45a1.55 1.55 0 0 0-2.19 0L8.7 2.63l2.76 2.76a1.84 1.84 0 0 1 2.33 2.35l2.66 2.66a1.84 1.84 0 1 1-1.1 1.04l-2.48-2.48v6.53a1.84 1.84 0 1 1-1.51-.05V8.85a1.84 1.84 0 0 1-1-2.42L7.64 3.7.45 10.88a1.55 1.55 0 0 0 0 2.19l10.48 10.48a1.55 1.55 0 0 0 2.19 0l10.43-10.43a1.55 1.55 0 0 0 0-2.19" />
  </Fill>
);

/* --------------------------------------------------------------- Registries */

export const techIcons: Record<TechId, IconComponent> = {
  react: ReactIcon,
  next: NextIcon,
  typescript: TypeScriptIcon,
  tailwind: TailwindIcon,
  vite: ViteIcon,
  git: GitIcon,
};

export const socialIcons: Record<SocialId, IconComponent> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
};
