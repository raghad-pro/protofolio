import { cn } from "@/lib/cn";

export function Spinner({ className, label }: { className?: string; label?: string }) {
  return (
    <span role="status" className={cn("inline-flex items-center gap-2 text-sm text-ds-muted", className)}>
      <span
        aria-hidden
        className="size-4 animate-spin rounded-full border-2 border-ds-primary/25 border-t-ds-primary"
      />
      {label && <span>{label}</span>}
    </span>
  );
}
