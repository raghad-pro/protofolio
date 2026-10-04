"use client";

import { useSyncExternalStore, type ReactNode } from "react";

const noopSubscribe = () => () => {};

/** `false` during SSR and hydration, `true` afterwards — without an effect. */
export function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/** Renders `children` only in the browser (portals, `window` APIs, …). */
export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  return useIsClient() ? children : fallback;
}
