"use client";

import { useSyncExternalStore, type ReactNode } from "react";

let cachedSupport: boolean | undefined;

function detectWebGL(): boolean {
  if (cachedSupport !== undefined) return cachedSupport;
  try {
    const canvas = document.createElement("canvas");
    cachedSupport = Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    cachedSupport = false;
  }
  return cachedSupport;
}

const noopSubscribe = () => () => {};

interface WebGLGuardProps {
  children: ReactNode;
  /** Shown on the server, during hydration, and when WebGL is unavailable. */
  fallback: ReactNode;
}

/**
 * Only mounts 3D content in browsers that can render it, so low-end devices
 * and SSR get a lightweight static fallback instead of a blank canvas.
 */
export function WebGLGuard({ children, fallback }: WebGLGuardProps) {
  const supported = useSyncExternalStore(noopSubscribe, detectWebGL, () => false);
  return supported ? children : fallback;
}
