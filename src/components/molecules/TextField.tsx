import { useId } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/lib/cn";

interface TextFieldProps {
  label: string;
  registration: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
  type?: "text" | "email";
  autoComplete?: string;
  multiline?: boolean;
  className?: string;
}

/** Labelled input/textarea wired to react-hook-form, with an accessible error. */
export function TextField({
  label,
  registration,
  error,
  placeholder,
  type = "text",
  autoComplete,
  multiline = false,
  className,
}: TextFieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  const shared = {
    id,
    placeholder,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    ...registration,
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={id} className="text-sm font-medium text-ds-fg">
        {label}
      </label>
      {multiline ? (
        <textarea rows={5} className="ds-input resize-y" {...shared} />
      ) : (
        <input type={type} autoComplete={autoComplete} className="ds-input" {...shared} />
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
