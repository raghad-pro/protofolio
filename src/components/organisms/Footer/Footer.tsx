import { useTranslations } from "next-intl";
import { SocialLinks } from "@/components/molecules";

/** Minimal site footer. */
export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-ds-border py-10">
      <div className="ds-container flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-start">
        <p className="text-sm text-ds-muted">{t("rights", { year: new Date().getFullYear() })}</p>
        <div className="flex items-center gap-4">
          <SocialLinks />
          <a href="#home" className="text-sm font-medium text-ds-muted transition-colors hover:text-ds-primary">
            {t("backToTop")} ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
