import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Chip({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ds-chip", className)} {...props} />;
}
