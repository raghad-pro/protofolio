"use client";

import { ContactShadows, Float, Sparkles } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { getScenePalette } from "@/config/theme";
import { StylizedAvatar, triggerAvatarGesture, useWindowPointer } from "@/modules/avatar";
import { TechOrbit, type OrbitTech } from "./TechOrbit";

export interface HeroSceneProps {
  isDark: boolean;
  /** Pauses rendering while the hero is off-screen. */
  active: boolean;
  reducedMotion: boolean;
  tech: OrbitTech[];
}

/**
 * The hero's WebGL stage. Loaded with `next/dynamic({ ssr: false })` so
 * three.js never ships in the server bundle or blocks first paint.
 */
export default function HeroScene({ isDark, active, reducedMotion, tech }: HeroSceneProps) {
  useWindowPointer();
  const palette = getScenePalette(isDark);

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7.4], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      onCreated={() => {
        if (!reducedMotion) setTimeout(() => triggerAvatarGesture("wave"), 900);
      }}
    >
      <ambientLight intensity={isDark ? 0.55 : 0.95} />
      <directionalLight position={[3, 4, 5]} intensity={isDark ? 1.6 : 1.9} />
      <directionalLight position={[-4, 2, 3]} intensity={0.35} color={palette.glow} />
      {/* Theme-reactive rim light from behind */}
      <pointLight position={[0, 1.2, -2.2]} intensity={isDark ? 26 : 12} distance={9} color={palette.primary} />

      <Suspense fallback={null}>
        <Float
          speed={reducedMotion ? 0 : 1.6}
          rotationIntensity={0.12}
          floatIntensity={reducedMotion ? 0 : 0.45}
          floatingRange={[-0.06, 0.06]}
        >
          <group position={[0, 0.55, 0]} scale={1.18}>
            <StylizedAvatar
              outfitColor={palette.primary}
              reducedMotion={reducedMotion}
              onPoke={() => triggerAvatarGesture(Math.random() > 0.5 ? "wave" : "nod")}
            />
          </group>
        </Float>

        <TechOrbit items={tech} reducedMotion={reducedMotion} />

        <Sparkles
          count={reducedMotion ? 0 : 36}
          scale={[5.5, 4.2, 3]}
          size={2.4}
          speed={0.35}
          color={palette.primary}
          opacity={isDark ? 0.85 : 0.5}
        />
        <ContactShadows
          position={[0, -1.85, 0]}
          opacity={isDark ? 0.55 : 0.3}
          scale={6}
          blur={2.6}
          far={3}
          resolution={256}
          color={isDark ? "#000000" : "#6B6560"}
        />
      </Suspense>
    </Canvas>
  );
}
