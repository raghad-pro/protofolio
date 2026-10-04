"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ThemeProvider } from "./ThemeProvider";

/**
 * Client-side providers. `NextIntlClientProvider` is mounted by the server
 * layout (it needs the request locale), so it wraps this component.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </ThemeProvider>
  );
}
