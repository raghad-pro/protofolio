"use client";

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";
import { techIcons } from "@/assets/icons/icons";
import { TechOrbitBadge } from "@/components/molecules/TechOrbitBadge";
import type { TechItem } from "@/modules/portfolio";

export interface OrbitTech extends TechItem {
  description: string;
}

interface TechOrbitProps {
  items: OrbitTech[];
  radius?: number;
  speed?: number;
  reducedMotion?: boolean;
}

const TAU = Math.PI * 2;

/**
 * Tech badges orbiting the avatar on a tilted ellipse. Badges are real DOM
 * (drei <Html>) so they stay crisp, focusable and can show tooltips; the
 * whole orbit pauses while any badge is hovered or focused.
 */
export function TechOrbit({ items, radius = 1.8, speed = 0.3, reducedMotion = false }: TechOrbitProps) {
  const anchors = useRef<(Group | null)[]>([]);
  const badges = useRef<(HTMLDivElement | null)[]>([]);
  const angle = useRef(0);
  const paused = useRef(false);

  useFrame((_, delta) => {
    if (!paused.current && !reducedMotion) angle.current += delta * speed;

    items.forEach((_, i) => {
      const a = angle.current + (i / items.length) * TAU;
      const depth = Math.sin(a); // -1 (behind) … 1 (in front)
      // Tilted ring: passes low in front of the torso and high behind the head.
      anchors.current[i]?.position.set(Math.cos(a) * radius, -depth * 0.7 - 0.1, depth * radius * 0.6);

      // DOM always paints above the WebGL canvas, so fake occlusion: badges
      // fade out near the sides and are fully hidden while behind the avatar.
      const el = badges.current[i];
      if (el) {
        const opacity = Math.min(1, Math.max(0, (depth + 0.1) / 0.3));
        el.style.opacity = opacity.toFixed(3);
        el.style.visibility = opacity === 0 ? "hidden" : "visible";
        el.style.pointerEvents = opacity < 0.5 ? "none" : "auto";
      }
    });
  });

  return (
    <group>
      {items.map((item, i) => (
        <group key={item.id} ref={(node) => void (anchors.current[i] = node)}>
          <Html center zIndexRange={[40, 0]} distanceFactor={5}>
            <div ref={(node) => void (badges.current[i] = node)}>
              <TechOrbitBadge
                name={item.name}
                description={item.description}
                color={item.color}
                Icon={techIcons[item.id]}
                onHoverChange={(hovered) => (paused.current = hovered)}
              />
            </div>
          </Html>
        </group>
      ))}
    </group>
  );
}
