'use client';

import { RoundedBox } from '@react-three/drei';

// Shared palette (pippipi green / purple / gray).
const GREEN = '#57d98a';
const GREEN_DEEP = '#2fa566';
const PURPLE = '#b06bf0';
const PURPLE_DEEP = '#8b3fe0';
const GRAY = '#cdcdd6';
const GRAY_DEEP = '#a6a6b2';

const glow = (color, intensity = 0.7) => ({
  color,
  emissive: color,
  emissiveIntensity: intensity,
  toneMapped: false,
  roughness: 0.45,
  metalness: 0.1,
});

/* 1 — Retro computer (Cypra) */
export function Computer() {
  return (
    <group scale={0.9} position={[0, -0.1, 0]}>
      <RoundedBox args={[2.8, 2.3, 2]} radius={0.18} smoothness={4} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={GRAY} roughness={0.6} />
      </RoundedBox>
      <mesh position={[0, 0.6, 1.02]}>
        <planeGeometry args={[2, 1.4]} />
        <meshStandardMaterial {...glow(GREEN, 0.9)} />
      </mesh>
      <RoundedBox args={[1.1, 0.45, 1]} radius={0.12} position={[0, -0.95, -0.1]}>
        <meshStandardMaterial color={GRAY_DEEP} />
      </RoundedBox>
      <RoundedBox args={[2, 0.3, 1.5]} radius={0.1} position={[0, -1.28, -0.1]}>
        <meshStandardMaterial color={GRAY_DEEP} />
      </RoundedBox>
      <mesh position={[1, -0.5, 1.05]}><sphereGeometry args={[0.07, 16, 16]} /><meshStandardMaterial {...glow(PURPLE, 1.4)} /></mesh>
    </group>
  );
}

/* 2 — Floppy disk (Teamflix) */
export function Floppy() {
  return (
    <group scale={1.15} rotation={[0.2, 0, 0]}>
      <RoundedBox args={[2.6, 2.6, 0.32]} radius={0.08} smoothness={3}>
        <meshStandardMaterial {...glow(PURPLE, 0.45)} roughness={0.5} />
      </RoundedBox>
      {/* metal slider */}
      <mesh position={[0, 0.95, 0.18]}><boxGeometry args={[1.5, 0.7, 0.06]} /><meshStandardMaterial color={GRAY} metalness={0.6} roughness={0.3} /></mesh>
      <mesh position={[0.45, 0.95, 0.22]}><boxGeometry args={[0.3, 0.55, 0.04]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
      {/* label */}
      <mesh position={[0, -0.45, 0.18]}><planeGeometry args={[1.9, 1.25]} /><meshStandardMaterial color="#f4f1fa" /></mesh>
      <mesh position={[0, -0.2, 0.19]}><planeGeometry args={[1.7, 0.18]} /><meshStandardMaterial {...glow(GREEN, 0.6)} /></mesh>
      <mesh position={[0, -0.5, 0.19]}><planeGeometry args={[1.7, 0.12]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
      <mesh position={[0, -0.75, 0.19]}><planeGeometry args={[1.7, 0.12]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
    </group>
  );
}

/* 3 — Retro TV (Frame / video) */
export function RetroTV() {
  return (
    <group scale={0.92} position={[0, -0.1, 0]}>
      <RoundedBox args={[3, 2.3, 1.9]} radius={0.2} smoothness={4} position={[0, 0.3, 0]}>
        <meshStandardMaterial color={GRAY} roughness={0.55} />
      </RoundedBox>
      <mesh position={[-0.35, 0.4, 0.98]}><planeGeometry args={[1.9, 1.5]} /><meshStandardMaterial {...glow(PURPLE, 0.95)} /></mesh>
      {/* knobs */}
      <mesh position={[1.15, 0.85, 0.95]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.16, 0.16, 0.18, 16]} /><meshStandardMaterial {...glow(GREEN, 0.7)} /></mesh>
      <mesh position={[1.15, 0.2, 0.95]}><cylinderGeometry args={[0.16, 0.16, 0.18, 16]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
      {/* antenna */}
      <mesh position={[-0.4, 1.7, 0]} rotation={[0, 0, 0.5]}><cylinderGeometry args={[0.03, 0.03, 1.6, 8]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
      <mesh position={[0.4, 1.7, 0]} rotation={[0, 0, -0.5]}><cylinderGeometry args={[0.03, 0.03, 1.6, 8]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
      {/* legs */}
      <mesh position={[-1, -1.1, 0.4]} rotation={[0, 0, 0.3]}><cylinderGeometry args={[0.05, 0.05, 0.6, 8]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
      <mesh position={[1, -1.1, 0.4]} rotation={[0, 0, -0.3]}><cylinderGeometry args={[0.05, 0.05, 0.6, 8]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
    </group>
  );
}

/* 4 — Coin (Visor / finance) */
export function Coin() {
  return (
    <group scale={1.25} rotation={[0.35, 0, 0.1]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.5, 1.5, 0.3, 48]} />
        <meshStandardMaterial {...glow(GREEN, 0.4)} metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, 0.16]}>
        <torusGeometry args={[1.2, 0.08, 16, 48]} />
        <meshStandardMaterial {...glow(GREEN_DEEP, 0.6)} />
      </mesh>
      <mesh position={[0, 0, 0.18]}>
        <boxGeometry args={[0.18, 1.1, 0.05]} />
        <meshStandardMaterial {...glow(GREEN_DEEP, 0.8)} />
      </mesh>
      <mesh position={[0, 0.45, 0.18]}><boxGeometry args={[0.55, 0.18, 0.05]} /><meshStandardMaterial {...glow(GREEN_DEEP, 0.8)} /></mesh>
      <mesh position={[0, -0.45, 0.18]}><boxGeometry args={[0.55, 0.18, 0.05]} /><meshStandardMaterial {...glow(GREEN_DEEP, 0.8)} /></mesh>
    </group>
  );
}

/* 5 — Gem / crystal (Crypto prediction) */
export function Gem() {
  return (
    <group scale={1.25}>
      <mesh>
        <octahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial {...glow(PURPLE, 0.65)} metalness={0.3} roughness={0.2} flatShading />
      </mesh>
      <mesh scale={1.001}>
        <octahedronGeometry args={[1.6, 0]} />
        <meshBasicMaterial color={PURPLE_DEEP} wireframe />
      </mesh>
    </group>
  );
}

/* 6 — Rocket (Vext) */
export function Rocket() {
  return (
    <group scale={1.05} rotation={[0.1, 0, 0.18]}>
      <mesh position={[0, 0.4, 0]}><cylinderGeometry args={[0.55, 0.55, 2, 24]} /><meshStandardMaterial color={GRAY} roughness={0.4} /></mesh>
      <mesh position={[0, 1.7, 0]}><coneGeometry args={[0.55, 1, 24]} /><meshStandardMaterial {...glow(PURPLE, 0.55)} /></mesh>
      <mesh position={[0, 0.5, 0.5]}><sphereGeometry args={[0.28, 24, 24]} /><meshStandardMaterial {...glow(GREEN, 0.9)} /></mesh>
      {/* fins */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.55, -0.5, 0]} rotation={[0, 0, s * -0.5]}>
          <boxGeometry args={[0.5, 0.7, 0.1]} /><meshStandardMaterial {...glow(GREEN_DEEP, 0.5)} />
        </mesh>
      ))}
      {/* flame */}
      <mesh position={[0, -1.1, 0]}><coneGeometry args={[0.4, 0.9, 16]} /><meshStandardMaterial {...glow('#ffb454', 1.2)} /></mesh>
    </group>
  );
}

/* 7 — Robot head (Jarvis) */
export function RobotHead() {
  return (
    <group scale={1} position={[0, -0.1, 0]}>
      <RoundedBox args={[2.4, 2, 2]} radius={0.25} smoothness={4} position={[0, 0.3, 0]}>
        <meshStandardMaterial color={GRAY} roughness={0.5} metalness={0.3} />
      </RoundedBox>
      {/* visor */}
      <RoundedBox args={[1.8, 0.7, 0.2]} radius={0.1} position={[0, 0.45, 1]}>
        <meshStandardMaterial color="#1a1a22" />
      </RoundedBox>
      <mesh position={[-0.4, 0.45, 1.12]}><sphereGeometry args={[0.16, 20, 20]} /><meshStandardMaterial {...glow(GREEN, 1.3)} /></mesh>
      <mesh position={[0.4, 0.45, 1.12]}><sphereGeometry args={[0.16, 20, 20]} /><meshStandardMaterial {...glow(GREEN, 1.3)} /></mesh>
      {/* mouth grille */}
      {[-0.3, 0, 0.3].map((x) => (
        <mesh key={x} position={[x, -0.35, 1.02]}><boxGeometry args={[0.12, 0.4, 0.05]} /><meshStandardMaterial {...glow(PURPLE, 0.7)} /></mesh>
      ))}
      {/* antenna */}
      <mesh position={[0, 1.5, 0]}><cylinderGeometry args={[0.04, 0.04, 0.6, 8]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
      <mesh position={[0, 1.85, 0]}><sphereGeometry args={[0.13, 16, 16]} /><meshStandardMaterial {...glow(PURPLE, 1.3)} /></mesh>
      {/* ears */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 1.25, 0.3, 0]}><cylinderGeometry args={[0.18, 0.18, 0.3, 16]} rotation={[0, 0, Math.PI / 2]} /><meshStandardMaterial color={GRAY_DEEP} /></mesh>
      ))}
    </group>
  );
}

/* 8 — Game controller (VTM) */
export function Controller() {
  return (
    <group scale={1.1} rotation={[0.5, 0, 0]} position={[0, 0.1, 0]}>
      <RoundedBox args={[2.8, 1.1, 0.7]} radius={0.32} smoothness={4}>
        <meshStandardMaterial {...glow(PURPLE, 0.4)} roughness={0.5} />
      </RoundedBox>
      {/* dpad */}
      <mesh position={[-0.85, 0.1, 0.4]}><boxGeometry args={[0.5, 0.16, 0.1]} /><meshStandardMaterial color={GRAY} /></mesh>
      <mesh position={[-0.85, 0.1, 0.4]}><boxGeometry args={[0.16, 0.5, 0.1]} /><meshStandardMaterial color={GRAY} /></mesh>
      {/* buttons */}
      <mesh position={[0.75, 0.22, 0.42]}><sphereGeometry args={[0.13, 16, 16]} /><meshStandardMaterial {...glow(GREEN, 1)} /></mesh>
      <mesh position={[1.05, -0.05, 0.42]}><sphereGeometry args={[0.13, 16, 16]} /><meshStandardMaterial {...glow(GREEN, 1)} /></mesh>
      <mesh position={[0.45, -0.05, 0.42]}><sphereGeometry args={[0.13, 16, 16]} /><meshStandardMaterial {...glow(GREEN, 1)} /></mesh>
      <mesh position={[0.75, -0.32, 0.42]}><sphereGeometry args={[0.13, 16, 16]} /><meshStandardMaterial {...glow(GREEN, 1)} /></mesh>
    </group>
  );
}

/* 9 — Abstract art knot (3D project) */
export function ArtKnot() {
  return (
    <group scale={1.05}>
      <mesh>
        <torusKnotGeometry args={[1.1, 0.36, 160, 24]} />
        <meshStandardMaterial {...glow(GREEN, 0.55)} metalness={0.3} roughness={0.3} />
      </mesh>
      <mesh scale={0.62} rotation={[0.6, 0.4, 0]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial {...glow(PURPLE, 0.8)} flatShading />
      </mesh>
    </group>
  );
}

export const OBJECTS = {
  computer: Computer,
  floppy: Floppy,
  tv: RetroTV,
  coin: Coin,
  gem: Gem,
  rocket: Rocket,
  robot: RobotHead,
  controller: Controller,
  knot: ArtKnot,
};
