'use client';

import { useEffect, useState } from 'react';

// Renders a logo image; if it's missing or fails to load, shows `fallback`
// (a lettered badge or colored dot). The image is only mounted on the client
// so a transient pre-hydration error can't be replayed by React (which was
// causing valid logos like favicons to fall back to badges permanently).
export default function BrandLogo({ src, alt, className, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!src || failed || !mounted) return fallback;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={className}
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
