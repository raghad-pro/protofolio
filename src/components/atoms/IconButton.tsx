import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name — icon-only controls must always have one. */
  label: string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, className, type = "button", children, ...props },
  ref,
) {
  return (
    <button ref={ref} type={type} aria-label={label} title={label} className={cn("ds-icon-btn", className)} {...props}>
      {children}
    </button>
  );
});
