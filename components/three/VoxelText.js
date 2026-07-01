'use client';

import { useFrame } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

// 5x7 blocky uppercase font ('1' = a cube). Crossy-Road-style voxel text.
const F = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  B: ['11110', '10001', '10001', '11110', '10001', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '10000', '11110', '10000', '10000', '11111'],
  F: ['11111', '10000', '10000', '11110', '10000', '10000', '10000'],
  G: ['01111', '10000', '10000', '10111', '10001', '10001', '01111'],
  H: ['10001', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
  J: ['00111', '00010', '00010', '00010', '10010', '10010', '01100'],
  K: ['10001', '10010', '10100', '11000', '10100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10101', '10001', '10001', '10001'],
  N: ['10001', '11001', '10101', '10101', '10011', '10001', '10001'],
  O: ['01110', '10001', '10001', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '10001', '11110', '10000', '10000', '10000'],
  Q: ['01110', '10001', '10001', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '10001', '11110', '10100', '10010', '10001'],
  S: ['01111', '10000', '10000', '01110', '00001', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10001', '10101', '10101', '11011', '10001'],
  X: ['10001', '10001', '01010', '00100', '01010', '10001', '10001'],
  Y: ['10001', '10001', '01010', '00100', '00100', '00100', '00100'],
  Z: ['11111', '00001', '00010', '00100', '01000', '10000', '11111'],
  ' ': ['00000', '00000', '00000', '00000', '00000', '00000', '00000'],
};
const GW = 5, GH = 7;

// Compact 5x5 pixel font used for the BIG hero letters (matches Rohan's
// reference image — chunkier/squarer than the 5x7 set above).
const F5 = {
  A: ['01110', '10001', '11111', '10001', '10001'],
  B: ['11110', '10001', '11110', '10001', '11110'],
  C: ['01111', '10000', '10000', '10000', '01111'],
  D: ['11110', '10001', '10001', '10001', '11110'],
  E: ['11111', '10000', '11110', '10000', '11111'],
  F: ['11111', '10000', '11100', '10000', '10000'],
  G: ['01111', '10000', '10111', '10001', '01111'],
  H: ['10001', '10001', '11111', '10001', '10001'],
  I: ['01110', '00100', '00100', '00100', '01110'],
  J: ['00111', '00010', '00010', '10010', '01100'],
  K: ['10001', '10010', '11100', '10010', '10001'],
  L: ['10000', '10000', '10000', '10000', '11111'],
  M: ['10001', '11011', '10101', '10001', '10001'],
  N: ['10001', '11001', '10101', '10011', '10001'],
  O: ['01110', '10001', '10001', '10001', '01110'],
  P: ['11110', '10001', '11110', '10000', '10000'],
  Q: ['01110', '10001', '10101', '10010', '01101'],
  R: ['11110', '10001', '11110', '10010', '10001'],
  S: ['01111', '10000', '01110', '00001', '11110'],
  T: ['11111', '00100', '00100', '00100', '00100'],
  U: ['10001', '10001', '10001', '10001', '01110'],
  V: ['10001', '10001', '10001', '01010', '00100'],
  W: ['10001', '10001', '10101', '11011', '10001'],
  X: ['10001', '01010', '00100', '01010', '10001'],
  Y: ['10001', '10001', '01110', '00100', '00100'],
  Z: ['11111', '00010', '00100', '01000', '11111'],
  ' ': ['00000', '00000', '00000', '00000', '00000'],
};
const GW5 = 5, GH5 = 5;

function layout(text) {
  const cells = [];
  let x = 0;
  for (const ch of text.toUpperCase()) {
    const g = F5[ch] || F5[' '];
    for (let r = 0; r < GH5; r++)
      for (let c = 0; c < GW5; c++)
        if (g[r][c] === '1') cells.push([x + c, GH5 - 1 - r]);
    x += GW5 + 1;
  }
  const w = x - 1;
  return cells.map(([cx, cy]) => [cx - w / 2, cy - GH5 / 2]);
}

// One word as instanced cubes. `size` sets spacing + cube size.
// Color cycles through the hue wheel over time (the "changing colors" look),
// with a per-word `phase`/`speed`/`sat`/`light` so the composition shimmers
// like a wave instead of all words pulsing in lockstep. Pass a static `color`
// + `animate={false}` to opt out.
export function VoxelWord({
  text, size = 1, depth, position = [0, 0, 0], rotation = [0, 0, 0],
  color = '#888', animate = true, hue = 0, phase = 0, speed = 0.045, sat = 0.6, light = 0.6,
  onPointerOver, onPointerOut,
}) {
  const ref = useRef();
  const matRef = useRef();
  const cells = useMemo(() => layout(text), [text]);
  const d = depth ?? size * 1.4;
  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    cells.forEach((p, i) => {
      m.makeTranslation(p[0] * size, p[1] * size, 0);
      ref.current.setMatrixAt(i, m);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  }, [cells, size]);
  useFrame((s) => {
    if (!animate || !matRef.current) return;
    const h = (hue + phase + s.clock.elapsedTime * speed) % 1;
    matRef.current.color.setHSL((h + 1) % 1, sat, light);
  });
  return (
    <instancedMesh
      ref={ref}
      args={[undefined, undefined, cells.length]}
      position={position}
      rotation={rotation}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <boxGeometry args={[size * 0.96, size * 0.96, d]} />
      {/* flat matte voxels — no shadows; clean front-on look */}
      <meshStandardMaterial ref={matRef} color={color} roughness={1} metalness={0} />
    </instancedMesh>
  );
}

const PLATE_GRAY = '#bcbcc6';

// A stacked block of words mounted on a solid gray voxel pedestal: the gap cells
// of the bounding rectangle are filled with gray cubes, and the letters sit
// raised in front in cycling color — the "name carved on a slab" look.
export function VoxelPlate({
  rows, size = 0.185, position = [0, 0, 0], rotation = [0, 0, 0],
  rowHues = [], speed = 0.06, sat = 0.64, light = 0.56,
}) {
  const fillRef = useRef();
  const rowRefs = useRef([]);
  const matRefs = useRef([]);

  const { rowCells, fill } = useMemo(() => {
    const grids = rows.map((t) => [...t.toUpperCase()].map((ch) => F5[ch] || F5[' ']));
    const rowWidths = grids.map((g) => g.length * (GW5 + 1) - 1);
    const W = Math.max(...rowWidths);
    const gap = 1;
    const H = rows.length * GH5 + (rows.length - 1) * gap;
    const rowTop = (ri) => H - 1 - ri * (GH5 + gap); // top grid-row of word ri
    const rowCells = grids.map((g, ri) => {
      const xOff = Math.round((W - rowWidths[ri]) / 2);
      const baseY = rowTop(ri);
      const cells = [];
      let x = xOff;
      for (const ch of g) {
        for (let r = 0; r < GH5; r++)
          for (let c = 0; c < GW5; c++)
            if (ch[r][c] === '1') cells.push([x + c - W / 2, baseY - r - H / 2]);
        x += GW5 + 1;
      }
      return cells;
    });
    // Gray slab that HUGS each row (+1 cell padding) and bridges the gaps, so the
    // narrower rows don't float in a big rectangle of gray.
    const pad = 1;
    const seen = new Set();
    const fill = [];
    const add = (gx, gy) => {
      if (gx < 0 || gx >= W || gy < 0 || gy >= H) return;
      const k = gx + ',' + gy;
      if (seen.has(k)) return;
      seen.add(k);
      fill.push([gx - W / 2, gy - H / 2]);
    };
    rowWidths.forEach((rw, ri) => {
      const x0 = Math.round((W - rw) / 2) - pad;
      const x1 = x0 + rw - 1 + 2 * pad;
      const top = rowTop(ri) + pad;
      const bot = rowTop(ri) - (GH5 - 1) - pad;
      for (let gy = bot; gy <= top; gy++) for (let gx = x0; gx <= x1; gx++) add(gx, gy);
    });
    // bridge the gap rows between consecutive words at the narrower width
    for (let ri = 0; ri < rows.length - 1; ri++) {
      const wMin = Math.min(rowWidths[ri], rowWidths[ri + 1]);
      const x0 = Math.round((W - wMin) / 2);
      const top = rowTop(ri) - GH5 + pad;
      const bot = rowTop(ri + 1) + GH5 - 1 - pad;
      for (let gy = bot; gy <= top; gy++) for (let gx = x0; gx < x0 + wMin; gx++) add(gx, gy);
    }
    return { rowCells, fill };
  }, [rows]);

  const dBase = size * 1.5;
  const dTop = size * 2.2;
  const raise = size * 0.95; // letters pushed forward off the slab

  useLayoutEffect(() => {
    const m = new THREE.Matrix4();
    fill.forEach((p, i) => { m.makeTranslation(p[0] * size, p[1] * size, 0); fillRef.current.setMatrixAt(i, m); });
    fillRef.current.instanceMatrix.needsUpdate = true;
    rowCells.forEach((cells, ri) => {
      const mesh = rowRefs.current[ri];
      cells.forEach((p, i) => { m.makeTranslation(p[0] * size, p[1] * size, 0); mesh.setMatrixAt(i, m); });
      mesh.instanceMatrix.needsUpdate = true;
    });
  }, [fill, rowCells, size]);

  useFrame((s) => {
    const t = s.clock.elapsedTime;
    rowCells.forEach((_, ri) => {
      const mat = matRefs.current[ri];
      if (!mat) return;
      const h = (((rowHues[ri] || 0) + t * speed) % 1 + 1) % 1;
      mat.color.setHSL(h, sat, light);
    });
  });

  return (
    <group position={position} rotation={rotation}>
      <instancedMesh ref={fillRef} args={[undefined, undefined, fill.length]} castShadow receiveShadow>
        <boxGeometry args={[size * 0.98, size * 0.98, dBase]} />
        <meshStandardMaterial color={PLATE_GRAY} roughness={1} metalness={0} />
      </instancedMesh>
      {rowCells.map((cells, ri) => (
        <instancedMesh
          key={ri}
          ref={(el) => (rowRefs.current[ri] = el)}
          args={[undefined, undefined, cells.length]}
          position={[0, 0, raise]}
          castShadow receiveShadow
        >
          <boxGeometry args={[size * 0.95, size * 0.95, dTop]} />
          <meshStandardMaterial ref={(el) => (matRefs.current[ri] = el)} color="#888" roughness={1} metalness={0} />
        </instancedMesh>
      ))}
    </group>
  );
}

// Single global Z tilt applied to the whole group (the 3D/axonometric look comes
// from the orthographic camera). ~23°; positive ascends to the upper-right to
// match the reference image (a negative value would slope it down-right).
const SLANT = THREE.MathUtils.degToRad(11);

// The hero arrangement viewed through an orthographic isometric camera
// (see VoxelHero.js): a CLEAN vertical stack of floating voxel words (no slab) —
// the name (ROHAN / NALAM) is the big bright-yellow element, the roles are gray.
// ONE group, ONE global Z rotation; nothing is rotated per-word.
// Hovering a ROLE word recolors ROHAN/NALAM with a role-themed accent.
const HERO_GREEN = '#57d98a';  // matches site brand green (default name color)
const HERO_GRAY = '#c6c6cf';

// Accent color the name takes on when hovering a given role word.
const ROLE_ACCENT = {
  BUILDER: '#b06bf0',    // purple
  FOUNDER: '#f0866b',    // coral
  DEVELOPER: '#6bb6f0',  // sky blue
  RESEARCHER: '#d86bff', // magenta
  STUDENT: '#f0c46b',    // amber
};

export function VoxelHeroGroup() {
  const g = useRef();
  const scrollRef = useRef(0);
  const [hovered, setHovered] = useState(null); // role key or null

  useEffect(() => {
    const onScroll = () => { scrollRef.current = window.scrollY || 0; };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useFrame((s) => {
    if (!g.current) return;
    const t = s.clock.elapsedTime;
    const vh = window.innerHeight || 800;
    const p = Math.min(1.4, scrollRef.current / vh); // 0..1 over first screen
    g.current.rotation.z = SLANT + Math.sin(t * 0.22) * 0.01;
    g.current.position.y = Math.sin(t * 0.5) * 0.5 + p * 130; // gentle bob + scroll away
    g.current.visible = p < 1.25;
  });

  const nameColor = hovered ? ROLE_ACCENT[hovered] : HERO_GREEN;
  const roleHover = (role) => ({
    onPointerOver: (e) => { e.stopPropagation(); setHovered(role); document.body.style.cursor = 'pointer'; },
    onPointerOut: (e) => { e.stopPropagation(); setHovered((cur) => (cur === role ? null : cur)); document.body.style.cursor = ''; },
  });

  // Stacked rows: distinct Y per row + staggered X. Cube size sets the hierarchy.
  // Solid matte voxels, static colors (name reacts to role hover).
  return (
    <group ref={g} rotation={[0, 0, SLANT]}>
      <VoxelWord text="BUILDER" size={1.0} position={[-13, 38, 0]} color={HERO_GRAY} animate={false} {...roleHover('BUILDER')} />
      <VoxelWord text="FOUNDER" size={1.0} position={[-9, 28, 0]} color={HERO_GRAY} animate={false} {...roleHover('FOUNDER')} />
      <VoxelWord text="ROHAN" size={1.55} position={[-5, 16, 0]} color={nameColor} animate={false} />
      <VoxelWord text="NALAM" size={1.55} position={[0, 0, 0]} color={nameColor} animate={false} />
      <VoxelWord text="DEVELOPER" size={1.2} position={[4, -16, 0]} color={HERO_GRAY} animate={false} {...roleHover('DEVELOPER')} />
      <VoxelWord text="RESEARCHER" size={1.0} position={[10, -30, 0]} color={HERO_GRAY} animate={false} {...roleHover('RESEARCHER')} />
      <VoxelWord text="STUDENT" size={1.0} position={[-6, -42, 0]} color={HERO_GRAY} animate={false} {...roleHover('STUDENT')} />
    </group>
  );
}
