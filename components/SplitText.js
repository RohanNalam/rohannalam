'use client';

import { useEffect, useRef } from 'react';

// Splits text into per-letter spans that mask-reveal (slide+fade) on enter.
// Each letter gets a staggered delay — the "letter wave" look from
// rahulnalam.vercel.app and similar portfolios.
export default function SplitText({
  children,
  as: Tag = 'span',
  className = '',
  stagger = 0.035,     // delay per letter (s)
  duration = 0.65,     // per-letter animation duration (s)
  startDelay = 0,      // delay before the first letter begins (s)
  ...rest
}) {
  const ref = useRef(null);
  const text = String(children ?? '');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('split-in');
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('split-in');
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`split-text ${className}`} aria-label={text} {...rest}>
      {[...text].map((ch, i) => (
        <span
          key={i}
          className="split-char"
          style={{
            transitionDelay: `${startDelay + i * stagger}s`,
            transitionDuration: `${duration}s`,
          }}
          aria-hidden="true"
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </Tag>
  );
}
