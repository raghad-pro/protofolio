import type { ReactNode } from "react";

/** Shared tag renderers for `t.rich(...)` messages, e.g. "<accent>…</accent>". */
export const richText = {
  accent: (chunks: ReactNode) => <span className="ds-text-gradient">{chunks}</span>,
};
