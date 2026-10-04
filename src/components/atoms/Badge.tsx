import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "primary" | "neutral";

const tones: Record<BadgeTone, string> = {
  primary:
    "bg-ds-primary/10 text-ds-primary border-ds-primary/25 dark:bg-ds-primary/12 dark:border-ds-primary/30",
  neutral: "bg-ds-surface-2 text-ds-muted border-ds-border",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
