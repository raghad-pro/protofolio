import { env } from "./env";

export type SocialId = "github" | "linkedin" | "email";

export interface SocialLink {
  id: SocialId;
  href: string;
}

export const siteConfig = {
  url: env.siteUrl,
  email: env.contactEmail,
  socials: [
    { id: "github", href: env.githubUrl },
    { id: "linkedin", href: env.linkedinUrl },
    { id: "email", href: `mailto:${env.contactEmail}` },
  ] satisfies SocialLink[],
  nav: ["about", "experience", "projects"] as const,
} as const;

export type NavSection = (typeof siteConfig.nav)[number];
