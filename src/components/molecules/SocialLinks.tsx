"use client";

import { useTranslations } from "next-intl";
import { socialIcons } from "@/assets/icons/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";

export function SocialLinks({ className }: { className?: string }) {
  const t = useTranslations("socials");

  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {siteConfig.socials.map(({ id, href }) => {
        const Icon = socialIcons[id];
        const external = !href.startsWith("mailto:");
        return (
          <li key={id}>
            <a
              href={href}
              aria-label={t(id)}
              title={t(id)}
              {...(external && { target: "_blank", rel: "noopener noreferrer" })}
              className="ds-glass group grid size-11 place-items-center rounded-full text-ds-fg shadow-ds-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-ds-primary/40 hover:text-ds-primary hover:shadow-ds-glow"
            >
              <Icon className="size-[1.1rem] transition-transform duration-300 group-hover:scale-110" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
