"use client";

import { useLocale, useTranslations } from "next-intl";
import { useTransition } from "react";
import { GlobeIcon } from "@/assets/icons/icons";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const nextLocale: Locale = locale === "ar" ? "en" : "ar";

  return (
    <button
      type="button"
      aria-label={t("switchLocaleLabel")}
      disabled={isPending}
      onClick={() => startTransition(() => router.replace(pathname, { locale: nextLocale, scroll: false }))}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full px-3 text-sm font-medium text-ds-fg transition-colors hover:bg-ds-primary/10 hover:text-ds-primary disabled:opacity-60",
        className,
      )}
    >
      <GlobeIcon className="size-4" />
      <span lang={nextLocale}>{t("switchLocale")}</span>
    </button>
  );
}
