import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface StatCardProps {
  value: ReactNode;
  label: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div className={cn("ds-glass flex items-center gap-3 rounded-ds-md px-4 py-3 shadow-ds-sm", className)}>
      {icon && (
        <span className="grid size-10 shrink-0 place-items-center rounded-full bg-ds-primary/12 text-ds-primary">
          {icon}
        </span>
      )}
      <div className="flex flex-col leading-tight">
        <span className="text-lg font-bold text-ds-fg">{value}</span>
        <span className="text-xs text-ds-muted">{label}</span>
      </div>
    </div>
  );
}
