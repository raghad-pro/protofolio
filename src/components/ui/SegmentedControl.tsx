"use client";

import { motion } from "framer-motion";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface SegmentOption<T extends string> {
  value: T;
  label: ReactNode;
  icon?: ReactNode;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
  size?: "sm" | "md";
}

/** Tab-like toggle group with an animated active pill. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
  size = "md",
}: SegmentedControlProps<T>) {
  const layoutId = useId();

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("ds-glass inline-flex items-center gap-1 rounded-full p-1", className)}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={cn(
              "relative inline-flex items-center gap-1.5 rounded-full font-medium transition-colors",
              size === "sm" ? "h-8 px-3 text-xs" : "h-9 px-4 text-sm",
              active ? "text-ds-primary-contrast" : "text-ds-muted hover:text-ds-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                aria-hidden
                className="absolute inset-0 rounded-full bg-ds-primary shadow-ds-glow"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative inline-flex items-center gap-1.5">
              {option.icon}
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
