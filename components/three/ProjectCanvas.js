'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { useEffect, useRef, Suspense } from 'react';
import { OBJECTS } from './objects';

function Rig({ scrollRef, ObjectComp }) {
  const group = useRef();
  useFrame((state) => {
    if (!group.current) return;
    const p = scrollRef.current;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = p * Math.PI * 2 + t * 0.15;
    group.current.rotation.x = Math.sin(p * Math.PI) * 0.3 - 0.05;
    group.current.position.y = Math.sin(t * 1.2) * 0.12;
  });
  return (
    <group ref={group}>
      <ObjectComp />
    </group>
  );
}

export default function ProjectCanvas({ object = 'computer' }) {
  const wrapRef = useRef(null);
  const scrollRef = useRef(0);
  const ObjectComp = OBJECTS[object] || OBJECTS.computer;

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      scrollRef.current = Math.min(1, Math.max(0, 1 - center / vh));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div ref={wrapRef} className="project-canvas">
      <Canvas camera={{ position: [0, 0.3, 6.2], fov: 38 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[4, 6, 5]} intensity={1.2} />
        <pointLight position={[-5, -2, -3]} intensity={0.6} color="#b06bf0" />
        <pointLight position={[5, 2, 4]} intensity={0.5} color="#57d98a" />
        <Suspense fallback={null}>
          {/* IBL gives objects real reflections/specular — kills the flat AI look */}
          <Environment preset="city" />
          <Rig scrollRef={scrollRef} ObjectComp={ObjectComp} />
          <ContactShadows position={[0, -1.6, 0]} opacity={0.32} blur={2.4} far={3} scale={6} color="#1a1a2a" />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
