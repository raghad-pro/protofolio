/**
 * Public, build-time configuration. Every value has a safe fallback so the
 * site builds without a `.env.local`; override them per environment.
 */
export const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "raghadabdulla609@gmail.com",
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? "https://github.com/raghad-pro",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL ?? "https://www.linkedin.com/in/raghadayyad",
} as const;
