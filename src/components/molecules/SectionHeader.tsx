import type { ReactNode } from "react";
import { Eyebrow } from "@/components/atoms";
import { cn } from "@/lib/cn";

interface SectionHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  /** id for the heading, so the section can be `aria-labelledby` it. */
  id?: string;
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = "start", id, className }: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="ds-h2">
        {title}
      </h2>
      {description && <p className="ds-lead">{description}</p>}
    </header>
  );
}
