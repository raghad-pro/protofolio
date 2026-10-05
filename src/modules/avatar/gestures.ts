/**
 * Imperative gesture channel for the 3D avatar. Any component (e.g. the
 * contact form on success) can call `triggerAvatarGesture("wave")`; the
 * avatar reads the latest gesture every frame — no React re-render involved.
 */
export type AvatarGesture = "wave" | "nod";

export const GESTURE_DURATION: Record<AvatarGesture, number> = {
  wave: 2.2,
  nod: 1.4,
};

let current: { gesture: AvatarGesture | null; startedAt: number } = {
  gesture: null,
  startedAt: 0,
};

export function triggerAvatarGesture(gesture: AvatarGesture) {
  current = { gesture, startedAt: performance.now() };
}

/** Returns the active gesture and its elapsed time in seconds, if any. */
export function readAvatarGesture(): { gesture: AvatarGesture; elapsed: number } | null {
  if (!current.gesture) return null;
  const elapsed = (performance.now() - current.startedAt) / 1000;
  if (elapsed > GESTURE_DURATION[current.gesture]) {
    current = { gesture: null, startedAt: 0 };
    return null;
  }
  return { gesture: current.gesture, elapsed };
}
