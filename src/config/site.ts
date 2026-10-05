import { env } from "./env";

export type SocialId = "github" | "linkedin" | "instagram";

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
    { id: "instagram", href: env.instagramUrl },
  ] satisfies SocialLink[],
  nav: ["about", "experience", "projects"] as const,
} as const;

export type NavSection = (typeof siteConfig.nav)[number];
