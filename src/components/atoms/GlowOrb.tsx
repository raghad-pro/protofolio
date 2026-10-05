import { cn } from "@/lib/cn";

/** Decorative blurred light source; purely visual. */
export function GlowOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full bg-ds-primary/25 blur-3xl dark:bg-ds-primary/20",
        className,
      )}
    />
  );
}
