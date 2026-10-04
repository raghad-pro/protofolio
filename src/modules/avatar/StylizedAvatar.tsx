"use client";

import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { useRef } from "react";
import { MathUtils, type Group } from "three";
import { readAvatarGesture } from "./gestures";
import { pointer } from "./pointer";

const SKIN = "#F5CDB0";
const HAIR = "#2A1A16";
const EYE = "#1E1412";
const CHEEK = "#FF8A80";
const FRAME = "#2B2B2E";

interface StylizedAvatarProps {
  /** Hoodie color — follows the active theme's primary. */
  outfitColor: string;
  reducedMotion?: boolean;
  onPoke?: () => void;
}

/** Frame-rate independent damping factor for `lerp`. */
const damp = (lambda: number, delta: number) => 1 - Math.exp(-lambda * delta);

/**
 * Procedural, asset-free stylized character (≈0 KB download). Built from
 * primitives so it loads instantly; to use a sculpted model instead, load a
 * GLB with `useGLTF` and drive the same `head`/`armR` refs.
 *
 * Behaviours (all inside one `useFrame`, zero React re-renders):
 *  - head, eyes and torso follow the window cursor with damped `lerp`
 *  - periodic blinking and idle breathing
 *  - "wave" / "nod" gestures triggered via `triggerAvatarGesture`
 */
export function StylizedAvatar({ outfitColor, reducedMotion = false, onPoke }: StylizedAvatarProps) {
  const torso = useRef<Group>(null);
  const head = useRef<Group>(null);
  const nod = useRef<Group>(null);
  const pupils = useRef<Group>(null);
  const eyeL = useRef<Group>(null);
  const eyeR = useRef<Group>(null);
  const armR = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!torso.current || !head.current || !nod.current || !armR.current) return;
    const t = state.clock.elapsedTime;
    const follow = damp(reducedMotion ? 3 : 6, delta);

    // Cursor tracking — head leads, torso follows with less amplitude.
    head.current.rotation.y = MathUtils.lerp(head.current.rotation.y, pointer.x * 0.6, follow);
    head.current.rotation.x = MathUtils.lerp(head.current.rotation.x, -pointer.y * 0.32, follow);
    head.current.rotation.z = MathUtils.lerp(head.current.rotation.z, -pointer.x * 0.06, follow);
    torso.current.rotation.y = MathUtils.lerp(torso.current.rotation.y, pointer.x * 0.22, follow * 0.6);

    if (pupils.current) {
      pupils.current.position.x = MathUtils.lerp(pupils.current.position.x, pointer.x * 0.035, follow);
      pupils.current.position.y = MathUtils.lerp(pupils.current.position.y, pointer.y * 0.025, follow);
    }

    // Blink every ~4s (a quick squash on the eye's Y scale).
    const phase = t % 4.2;
    const blink = phase < 0.14 ? Math.sin((phase / 0.14) * Math.PI) : 0;
    eyeL.current?.scale.setY(1 - blink * 0.9);
    eyeR.current?.scale.setY(1 - blink * 0.9);

    // Idle breathing.
    if (!reducedMotion) torso.current.scale.y = 1 + Math.sin(t * 1.8) * 0.012;

    // Gestures.
    const active = readAvatarGesture();
    let armTarget = 0.18;
    let nodAngle = 0;

    if (active?.gesture === "wave") {
      const envelope = Math.sin(Math.min(active.elapsed / 2.2, 1) * Math.PI);
      armTarget = 0.18 + envelope * (2.35 + Math.sin(active.elapsed * 14) * 0.28);
    } else if (active?.gesture === "nod") {
      nodAngle = Math.sin(active.elapsed * 9) * 0.24 * (1 - active.elapsed / 1.4);
    }

    armR.current.rotation.z = MathUtils.lerp(armR.current.rotation.z, armTarget, damp(12, delta));
    nod.current.rotation.x = nodAngle;
  });

  const handlePoke = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onPoke?.();
  };

  return (
    <group
      onClick={handlePoke}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      {/* ---------- Torso ---------- */}
      <group ref={torso} position={[0, -1.25, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.52, 0.5, 8, 24]} />
          <meshStandardMaterial color={outfitColor} roughness={0.55} />
        </mesh>
        {/* Hoodie collar */}
        <mesh position={[0, 0.66, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.24, 0.06, 12, 32]} />
          <meshStandardMaterial color="#FFE2CF" roughness={0.6} />
        </mesh>
        {/* Hoodie strings */}
        {[-0.09, 0.09].map((x) => (
          <mesh key={x} position={[x, 0.4, 0.5]} rotation={[0.25, 0, 0]}>
            <capsuleGeometry args={[0.018, 0.22, 4, 8]} />
            <meshStandardMaterial color="#FFF4EC" />
          </mesh>
        ))}

        {/* Left arm (resting) */}
        <group position={[-0.5, 0.42, 0]} rotation={[0, 0, -0.18]}>
          <mesh position={[0, -0.38, 0]}>
            <capsuleGeometry args={[0.13, 0.48, 6, 16]} />
            <meshStandardMaterial color={outfitColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, -0.72, 0]}>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial color={SKIN} roughness={0.7} />
          </mesh>
        </group>

        {/* Right arm (waves) — pivot at the shoulder */}
        <group ref={armR} position={[0.5, 0.42, 0]} rotation={[0, 0, 0.18]}>
          <mesh position={[0, -0.38, 0]}>
            <capsuleGeometry args={[0.13, 0.48, 6, 16]} />
            <meshStandardMaterial color={outfitColor} roughness={0.55} />
          </mesh>
          <mesh position={[0, -0.72, 0]}>
            <sphereGeometry args={[0.12, 20, 20]} />
            <meshStandardMaterial color={SKIN} roughness={0.7} />
          </mesh>
        </group>
      </group>

      {/* ---------- Head ---------- */}
      <group ref={head} position={[0, 0.02, 0]}>
        <group ref={nod}>
          {/* Face */}
          <mesh castShadow>
            <sphereGeometry args={[0.62, 48, 48]} />
            <meshStandardMaterial color={SKIN} roughness={0.75} />
          </mesh>

          {/* Ears */}
          {[-0.6, 0.6].map((x) => (
            <mesh key={x} position={[x, -0.02, -0.02]} scale={[0.6, 1, 0.8]}>
              <sphereGeometry args={[0.11, 16, 16]} />
              <meshStandardMaterial color={SKIN} roughness={0.75} />
            </mesh>
          ))}

          {/* Hair cap — tilted back so the face stays visible */}
          <mesh rotation={[-0.5, 0, 0]}>
            <sphereGeometry args={[0.665, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.56]} />
            <meshStandardMaterial color={HAIR} roughness={0.5} />
          </mesh>
          {/* Fringe */}
          <mesh position={[-0.2, 0.38, 0.42]} rotation={[0.5, 0, 0.5]} scale={[1.3, 0.55, 0.6]}>
            <sphereGeometry args={[0.22, 24, 24]} />
            <meshStandardMaterial color={HAIR} roughness={0.5} />
          </mesh>
          <mesh position={[0.22, 0.4, 0.4]} rotation={[0.5, 0, -0.4]} scale={[1.1, 0.5, 0.6]}>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshStandardMaterial color={HAIR} roughness={0.5} />
          </mesh>
          {/* Back hair */}
          <mesh position={[0, -0.32, -0.26]} scale={[1, 1, 0.7]}>
            <capsuleGeometry args={[0.52, 0.42, 8, 24]} />
            <meshStandardMaterial color={HAIR} roughness={0.5} />
          </mesh>
          {/* Bun */}
          <mesh position={[0, 0.66, -0.16]}>
            <sphereGeometry args={[0.22, 32, 32]} />
            <meshStandardMaterial color={HAIR} roughness={0.45} />
          </mesh>
          <mesh position={[0, 0.5, -0.12]} rotation={[Math.PI / 2 - 0.3, 0, 0]}>
            <torusGeometry args={[0.13, 0.035, 10, 24]} />
            <meshStandardMaterial color={outfitColor} roughness={0.4} />
          </mesh>

          {/* Eyes (pupils group drifts toward the cursor) */}
          <group ref={pupils}>
            {(
              [
                [-0.22, eyeL],
                [0.22, eyeR],
              ] as const
            ).map(([x, ref]) => (
              <group key={x} ref={ref} position={[x, 0.08, 0.56]}>
                <mesh scale={[1, 1.25, 0.6]}>
                  <sphereGeometry args={[0.072, 24, 24]} />
                  <meshStandardMaterial color={EYE} roughness={0.2} />
                </mesh>
                <mesh position={[0.024, 0.036, 0.04]}>
                  <sphereGeometry args={[0.02, 12, 12]} />
                  <meshBasicMaterial color="#FFFFFF" />
                </mesh>
              </group>
            ))}
          </group>

          {/* Glasses */}
          <group position={[0, 0.08, 0.6]}>
            {[-0.22, 0.22].map((x) => (
              <mesh key={x} position={[x, 0, 0]}>
                <torusGeometry args={[0.145, 0.016, 12, 40]} />
                <meshStandardMaterial color={FRAME} metalness={0.6} roughness={0.3} />
              </mesh>
            ))}
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.02, 0]}>
              <cylinderGeometry args={[0.012, 0.012, 0.15, 8]} />
              <meshStandardMaterial color={FRAME} metalness={0.6} roughness={0.3} />
            </mesh>
          </group>

          {/* Cheeks */}
          {[-0.36, 0.36].map((x) => (
            <mesh key={x} position={[x, -0.1, 0.47]} scale={[1.4, 0.8, 0.4]}>
              <sphereGeometry args={[0.08, 16, 16]} />
              <meshStandardMaterial color={CHEEK} transparent opacity={0.45} roughness={1} />
            </mesh>
          ))}

          {/* Smile */}
          <mesh position={[0, -0.16, 0.585]} rotation={[0.15, 0, Math.PI]}>
            <torusGeometry args={[0.08, 0.018, 8, 24, Math.PI]} />
            <meshStandardMaterial color="#B4533A" roughness={0.6} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
