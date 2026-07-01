'use client';

import { useState } from 'react';
import { profile } from '@/data/profile';

// Stacked clean column: roles above the name, roles below, no recline.
const ROLES_TOP = ['BUILDER', 'FOUNDER'];
const ROLES_BOTTOM = ['DEVELOPER', 'RESEARCHER', 'STUDENT'];

// Accent color the name takes on while hovering a role word.
const ROLE_ACCENT = {
  BUILDER: '#57d98a',    // green (matches site brand)
  FOUNDER: '#b06bf0',    // purple
  DEVELOPER: '#6bb6f0',  // sky blue
  RESEARCHER: '#f0866b', // coral
  STUDENT: '#d86bff',    // magenta
};

export default function Hero() {
  const [hovered, setHovered] = useState(null);
  const [first, ...rest] = profile.name.split(' ');
  const last = rest.join(' ');
  const onIn = (r) => () => setHovered(r);
  const onOut = (r) => () => setHovered((cur) => (cur === r ? null : cur));
  const accent = hovered ? ROLE_ACCENT[hovered] : null;
  const nameStyle = accent ? { '--name': accent, '--name-deep': accent } : undefined;
  return (
    <header className="hero">
      <div className="hero-stage">
        <div className="hero-glow" />

        <div className="role-row top">
          {ROLES_TOP.map((r) => (
            <span key={r} className="role" onPointerOver={onIn(r)} onPointerOut={onOut(r)}>{r}</span>
          ))}
        </div>

        <h1 className="hero-name" style={nameStyle} aria-label={`${first} ${last}`}>
          <FallingLine word={first} startDelay={0.15} />
          <br />
          <FallingLine word={last} startDelay={0.15 + first.length * 0.06 + 0.1} />
        </h1>

        <div className="role-row bottom">
          {ROLES_BOTTOM.map((r) => (
            <span key={r} className="role" onPointerOver={onIn(r)} onPointerOut={onOut(r)}>{r}</span>
          ))}
        </div>
      </div>
    </header>
  );
}

// Per-letter "drop into place" animation. Each char span gets a staggered
// `animation-delay` so the letters land sequentially with a soft bounce.
function FallingLine({ word, startDelay = 0 }) {
  return (
    <span className="fall-line" aria-hidden="true">
      {[...word].map((ch, i) => (
        <span
          key={i}
          className="fall-char"
          style={{ animationDelay: `${startDelay + i * 0.06}s` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
