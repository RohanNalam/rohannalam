'use client';

import dynamic from 'next/dynamic';

// Background floating-shapes canvas. The hero name is CSS text (Press Start 2P,
// extruded) rendered in Hero.js — not a voxel canvas.
const Scene3D = dynamic(() => import('./three/Scene3D'), { ssr: false });

const BLOBS = [
  { c: 'rgba(176,107,240,0.45)', size: 520, top: '8%', left: '62%', dur: '22s' },
  { c: 'rgba(87,217,138,0.38)', size: 460, top: '55%', left: '8%', dur: '26s' },
  { c: 'rgba(240,184,107,0.34)', size: 400, top: '72%', left: '70%', dur: '30s' },
  { c: 'rgba(240,107,140,0.30)', size: 360, top: '30%', left: '30%', dur: '24s' },
  { c: 'rgba(107,182,240,0.32)', size: 420, top: '86%', left: '40%', dur: '28s' },
];

export default function Background() {
  return (
    <div className="bg-layer" aria-hidden="true">
      {BLOBS.map((b, i) => (
        <span
          key={i}
          className="bg-blob"
          style={{
            background: `radial-gradient(circle, ${b.c} 0%, transparent 70%)`,
            width: b.size, height: b.size, top: b.top, left: b.left,
            animationDuration: b.dur,
          }}
        />
      ))}

      <div className="bg-canvas"><Scene3D /></div>
    </div>
  );
}
