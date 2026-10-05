"use client";

import { ContactShadows, Float, OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { SRGBColorSpace, TextureLoader } from "three";
import { getScenePalette } from "@/config/theme";

interface ProjectMiniatureProps {
  /** Public path of the project screenshot shown on the laptop screen. */
  screenshot: string;
  isDark: boolean;
  reducedMotion: boolean;
}

const SCREEN_W = 3.0;
const SCREEN_H = 1.875;

/** Laptop screen showing the screenshot like CSS `object-fit: cover`, anchored to the top. */
function Screen({ screenshot }: { screenshot: string }) {
  const source = useLoader(TextureLoader, screenshot);

  const texture = useMemo(() => {
    const tex = source.clone();
    tex.colorSpace = SRGBColorSpace;
    tex.anisotropy = 8;
    const image = tex.image as { width: number; height: number };
    const imageAspect = image.width / image.height;
    const screenAspect = SCREEN_W / SCREEN_H;
    if (imageAspect > screenAspect) {
      tex.repeat.set(screenAspect / imageAspect, 1);
      tex.offset.set((1 - tex.repeat.x) / 2, 0);
    } else {
      tex.repeat.set(1, imageAspect / screenAspect);
      tex.offset.set(0, 1 - tex.repeat.y);
    }
    tex.needsUpdate = true;
    return tex;
  }, [source]);

  return (
    <>
      {/* White backing so transparent screenshots read as a lit display */}
      <mesh position={[0, 1.03, 0.043]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </mesh>
      <mesh position={[0, 1.03, 0.045]}>
        <planeGeometry args={[SCREEN_W, SCREEN_H]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </>
  );
}

function Laptop({ screenshot, isDark }: { screenshot: string; isDark: boolean }) {
  const palette = getScenePalette(isDark);

  return (
    <group position={[0, -0.55, 0]} rotation={[0.08, -0.35, 0]}>
      {/* Base */}
      <RoundedBox args={[3.2, 0.12, 2.1]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color={palette.device} metalness={0.55} roughness={0.35} />
      </RoundedBox>
      <mesh position={[0, 0.062, 0.1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.8, 1.3]} />
        <meshStandardMaterial color={isDark ? "#1A1A1D" : "#C9C3BA"} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.062, 0.86]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1, 0.32]} />
        <meshStandardMaterial color={isDark ? "#232327" : "#CFC9C0"} roughness={0.6} />
      </mesh>

      {/* Lid — hinged at the back edge */}
      <group position={[0, 0.06, -1.03]} rotation={[-0.28, 0, 0]}>
        <RoundedBox args={[3.2, 2.05, 0.08]} radius={0.05} smoothness={4} position={[0, 1.02, 0]}>
          <meshStandardMaterial color={palette.device} metalness={0.55} roughness={0.35} />
        </RoundedBox>
        <Suspense
          fallback={
            <mesh position={[0, 1.03, 0.045]}>
              <planeGeometry args={[SCREEN_W, SCREEN_H]} />
              <meshBasicMaterial color={isDark ? "#111113" : "#F4EFE7"} />
            </mesh>
          }
        >
          <Screen screenshot={screenshot} />
        </Suspense>
      </group>
    </group>
  );
}

/** Interactive 3D laptop preview of a project. */
export default function ProjectMiniature({ screenshot, isDark, reducedMotion }: ProjectMiniatureProps) {
  const palette = getScenePalette(isDark);

  return (
    <Canvas dpr={[1, 1.75]} camera={{ position: [0, 1.2, 5.4], fov: 38 }} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={isDark ? 0.6 : 0.9} />
      <directionalLight position={[4, 5, 4]} intensity={1.6} />
      <pointLight position={[-3, 1.5, -2]} intensity={14} distance={10} color={palette.primary} />

      <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.15} floatIntensity={0.35}>
        <Laptop screenshot={screenshot} isDark={isDark} />
      </Float>

      <ContactShadows position={[0, -1.1, 0]} opacity={isDark ? 0.6 : 0.3} scale={8} blur={2.4} far={3} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}
