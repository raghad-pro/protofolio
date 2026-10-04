import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

interface ProjectCoverProps {
  /** Public path of the project screenshot. */
  screenshot: string;
  accent: string;
  className?: string;
}

/** Project screenshot inside a mini browser window, over a tinted backdrop. */
export function ProjectCover({ screenshot, accent, className }: ProjectCoverProps) {
  return (
    <div
      aria-hidden
      style={{ "--accent": accent } as CSSProperties}
      className={cn(
        "relative aspect-[16/10] overflow-hidden bg-[radial-gradient(120%_90%_at_100%_0%,color-mix(in_oklab,var(--accent)_28%,transparent),transparent_60%)] bg-ds-surface-2",
        className,
      )}
    >
      <div className="absolute inset-x-5 top-5 bottom-0 overflow-hidden rounded-t-xl border border-b-0 border-ds-border bg-white shadow-ds transition-transform duration-700 ease-ds-out group-hover:-translate-y-1.5">
        <div className="flex h-6 items-center gap-1.5 border-b border-black/10 bg-white px-3">
          <span className="size-1.5 rounded-full bg-[#FF5F57]" />
          <span className="size-1.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-1.5 rounded-full bg-[#28C840]" />
          <span className="ms-3 h-2 w-24 rounded-full bg-black/5" />
        </div>
        <div className="relative h-[calc(100%-1.5rem)]">
          <Image
            src={screenshot}
            alt=""
            fill
            sizes="(min-width: 1024px) 380px, (min-width: 768px) 45vw, 90vw"
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
