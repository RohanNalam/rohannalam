'use client';

import { Canvas } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { Suspense } from 'react';

// Background floating-shapes canvas (perspective). The hero voxel text lives in
// its own orthographic canvas (VoxelHero.js).

const SHAPES = [
  { pos: [-7.5, 2.6, -2], color: '#57d98a', s: 1.3, geo: 'ico' },
  { pos: [7.2, 1.4, -3], color: '#b06bf0', s: 1.6, geo: 'torus' },
  { pos: [-5.5, -2.8, -1], color: '#f0b86b', s: 1.1, geo: 'cone' },
  { pos: [5.8, -2.4, -2], color: '#6bb6f0', s: 1.0, geo: 'knot' },
  { pos: [-9, -1.5, -6], color: '#f0866b', s: 1.4, geo: 'sphere' },
  { pos: [-2.5, -3.6, -4], color: '#b06bf0', s: 0.9, geo: 'ico' },
  { pos: [3.5, 3.0, -6], color: '#57d98a', s: 1.2, geo: 'torus' },
  // extra floaters Rohan asked for — pushed wider/deeper so they fill the void
  { pos: [9.8, 3.7, -7], color: '#d86bff', s: 1.1, geo: 'octa' },
  { pos: [-10.5, 3.4, -5], color: '#6bb6f0', s: 0.95, geo: 'knot' },
  { pos: [10.2, -3.6, -5], color: '#57d98a', s: 1.0, geo: 'cube' },
  { pos: [-11.5, 0.6, -8], color: '#f0c46b', s: 1.3, geo: 'tetra' },
  { pos: [11.4, 0.2, -8], color: '#b06bf0', s: 1.15, geo: 'ico' },
  { pos: [0.6, 4.4, -7], color: '#f0866b', s: 0.85, geo: 'cube' },
  { pos: [-1.4, -4.6, -7], color: '#d86bff', s: 1.05, geo: 'octa' },
  { pos: [6.5, -4.2, -8], color: '#f0b86b', s: 0.95, geo: 'tetra' },
  { pos: [-6.5, 0.4, -9], color: '#6bb6f0', s: 1.25, geo: 'sphere' },
  { pos: [2.4, 1.2, -10], color: '#57d98a', s: 1.4, geo: 'cone' },
  { pos: [-3.6, 4.6, -9], color: '#f0866b', s: 0.8, geo: 'torus' },
];

function Geo({ geo }) {
  switch (geo) {
    case 'torus': return <torusGeometry args={[0.7, 0.28, 24, 64]} />;
    case 'cone': return <coneGeometry args={[0.8, 1.4, 32]} />;
    case 'knot': return <torusKnotGeometry args={[0.55, 0.2, 120, 16]} />;
    case 'sphere': return <sphereGeometry args={[0.9, 48, 48]} />;
    case 'octa': return <octahedronGeometry args={[0.9, 0]} />;
    case 'tetra': return <tetrahedronGeometry args={[1.0, 0]} />;
    case 'cube': return <boxGeometry args={[1.1, 1.1, 1.1]} />;
    default: return <icosahedronGeometry args={[0.95, 0]} />;
  }
}

function Shape({ pos, color, s, geo }) {
  return (
    <Float speed={1.6} rotationIntensity={1.3} floatIntensity={2.4} floatingRange={[-0.4, 0.4]}>
      <mesh position={pos} scale={s}>
        <Geo geo={geo} />
        <meshStandardMaterial
          color={color} emissive={color} emissiveIntensity={0.32}
          roughness={0.25} metalness={0.1} transparent opacity={0.92}
          flatShading={geo === 'ico' || geo === 'cone' || geo === 'octa' || geo === 'tetra' || geo === 'cube'}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 46 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[-6, 9, 8]} intensity={1.25} />
      <pointLight position={[6, -3, 2]} intensity={0.5} color="#b06bf0" />
      <Suspense fallback={null}>
        {SHAPES.map((sh, i) => <Shape key={i} {...sh} />)}
      </Suspense>
    </Canvas>
  );
}
