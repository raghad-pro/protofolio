"use client";

import { useEffect } from "react";

/**
 * Window-wide normalized pointer (-1…1 on both axes, +y up), read inside
 * `useFrame` without triggering React renders. Tracking the whole window
 * (not just the canvas) lets the avatar follow the cursor anywhere on the page.
 */
export const pointer = { x: 0, y: 0 };

let subscribers = 0;

const onPointerMove = (event: PointerEvent) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
};

export function useWindowPointer() {
  useEffect(() => {
    if (subscribers++ === 0) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }
    return () => {
      if (--subscribers === 0) {
        window.removeEventListener("pointermove", onPointerMove);
      }
    };
  }, []);
}
