'use client';

import { useEffect } from 'react';

// Cursor-following 3D tilt for every "box" on the site. Uses one delegated
// pointermove listener (so it also catches client-rendered tiles) and writes
// an inline transform; the elements' CSS transition smooths the follow and the
// ease-back. On pointer-leave the inline transform is cleared, so cards fall
// back to their scroll-reveal resting transform.
const SELECTOR = '.card:not(.card-btn), .exp-row, .proj-tile, .feat-card';
const MAX = 7; // max tilt in degrees

export default function TiltCards() {
  useEffect(() => {
    // Skip on touch / reduced-motion — the tilt is a pointer nicety.
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let current = null;
    let raf = 0;

    const reset = (el) => {
      if (el) el.style.transform = '';
    };

    const onMove = (e) => {
      const el = e.target.closest ? e.target.closest(SELECTOR) : null;
      if (el !== current) {
        reset(current);
        current = el;
      }
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5; // -0.5 .. 0.5
      const py = (e.clientY - r.top) / r.height - 0.5;
      const rx = (-py * 2 * MAX).toFixed(2);
      const ry = (px * 2 * MAX).toFixed(2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform =
          `perspective(820px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
      });
    };

    const onLeaveWindow = () => {
      reset(current);
      current = null;
    };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeaveWindow, { passive: true });
    window.addEventListener('blur', onLeaveWindow);

    return () => {
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeaveWindow);
      window.removeEventListener('blur', onLeaveWindow);
      cancelAnimationFrame(raf);
      reset(current);
    };
  }, []);

  return null;
}
