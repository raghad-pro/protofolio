import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "ghost";
export type ButtonSize = "sm" | "md";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "",
};

export const buttonClasses = (variant: ButtonVariant = "primary", size: ButtonSize = "md") =>
  cn("ds-btn", variant === "primary" ? "ds-btn-primary" : "ds-btn-ghost", sizes[size]);

interface Common {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: Common & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type={type} className={cn(buttonClasses(variant, size), className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: Common & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(buttonClasses(variant, size), className)} {...props} />;
}
