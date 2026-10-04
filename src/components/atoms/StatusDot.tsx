import { cn } from "@/lib/cn";

/** Small pulsing "live" indicator. */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-flex size-2.5", className)}>
      <span className="absolute inset-0 animate-ds-pulse-ring rounded-full bg-emerald-500" />
      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
    </span>
  );
}
