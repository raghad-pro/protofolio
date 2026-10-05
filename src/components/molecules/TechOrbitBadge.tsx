import type { IconComponent } from "@/assets/icons/icons";

interface TechOrbitBadgeProps {
  name: string;
  /** Read by screen readers only; the visual tooltip shows just the name. */
  description: string;
  color: string;
  Icon: IconComponent;
  onHoverChange: (hovered: boolean) => void;
}

/**
 * Rendered inside drei's <Html>, which mounts a separate React root — so this
 * molecule must stay context-free (plain props only, no provider hooks).
 */
export function TechOrbitBadge({ name, description, color, Icon, onHoverChange }: TechOrbitBadgeProps) {
  return (
    <button
      type="button"
      aria-label={`${name}: ${description}`}
      onPointerEnter={() => onHoverChange(true)}
      onPointerLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
      className="ds-glass group relative grid size-10 cursor-default place-items-center rounded-xl text-ds-fg transition-transform duration-300 hover:scale-110 focus-visible:scale-110"
      style={{ boxShadow: `0 8px 22px -12px ${color}` }}
    >
      <Icon className="size-5" style={{ color }} />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-full left-1/2 mb-1.5 -translate-x-1/2 translate-y-0.5 whitespace-nowrap rounded-md bg-ds-fg px-1.5 py-0.5 text-[10px] font-medium leading-tight text-ds-bg opacity-0 shadow-ds-sm transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
      >
        {name}
      </span>
    </button>
  );
}
