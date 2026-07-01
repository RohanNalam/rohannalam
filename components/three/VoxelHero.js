'use client';

import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { VoxelHeroGroup } from './VoxelText';

// Scale the voxel stack to the tab size: the orthographic zoom is derived from
// the canvas dimensions so the composition always fills roughly the same
// fraction of the viewport on any size tab.
function ResponsiveZoom() {
  const { camera, size } = useThree();
  useEffect(() => {
    camera.zoom = Math.min(size.width / 112, size.height / 140);
    camera.updateProjectionMatrix();
    camera.lookAt(0, 0, 0);
  }, [camera, size.width, size.height]);
  return null;
}

// Dedicated ORTHOGRAPHIC canvas for the hero voxel stack — separate from the
// (perspective) background-shapes canvas. The camera is nearly front-on with a
// small +X offset (and tiny +Y), so the letters STAND UPRIGHT and you only see
// a clean sliver of side depth — no "lying on a table" recline, no bottom-left
// vertex of each cube poking out. No shadows; clean flat-matte presentation.
export default function VoxelHero() {
  return (
    <Canvas
      orthographic
      camera={{ position: [-22, -8, 200], zoom: 5.8, near: 1, far: 1000 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      {/* even, soft front lighting — no harsh top-down "table" feel, no shadows */}
      <ambientLight intensity={0.85} />
      <directionalLight position={[-20, 30, 80]} intensity={0.8} />
      <directionalLight position={[40, 10, 60]} intensity={0.4} />
      <ResponsiveZoom />
      <Suspense fallback={null}>
        <VoxelHeroGroup />
      </Suspense>
    </Canvas>
  );
}
