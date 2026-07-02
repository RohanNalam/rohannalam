'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { profile } from '@/data/profile';

const NAV = [
  { label: 'About', href: '/#about', spy: 'about' },
  { label: 'Projects', href: '/#projects', spy: 'projects' },
  { label: 'Work', href: '/#work', spy: 'work' },
  { label: 'Diary', href: '/diary', spy: 'diary' },
];

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
  );
}
function SoundOnIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14" />
    </svg>
  );
}
function SoundOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 5 6 9H2v6h4l5 4z" /><path d="m23 9-6 6M17 9l6 6" />
    </svg>
  );
}

export default function Chrome() {
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [theme, setTheme] = useState('light');
  const [active, setActive] = useState(onHome ? 'about' : pathname.slice(1));
  const [sound, setSound] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const t = document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(t);
  }, []);

  // scroll-spy for the vertical nav (home only); subpages use the pathname.
  useEffect(() => {
    if (!onHome) { setActive(pathname.slice(1)); return; }
    const ids = NAV.map((n) => n.spy).filter(Boolean);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [onHome, pathname]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch {}
  };

  // Background music: "Beira Mar" — Erwin Do & Toti Cisneros (Summer in Rio).
  // Drop the full song at public/music.mp3 and it plays that; until the file
  // exists, the official 30s iTunes preview streams (and loops) instead.
  const MUSIC_LOCAL = '/music.mp3';
  const MUSIC_PREVIEW =
    'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/8b/a7/32/8ba732bc-1b56-5520-76a9-a559e0adee27/mzaf_11073543291188314661.plus.aac.p.m4a';

  const toggleSound = () => {
    if (!sound) {
      let audio = audioRef.current;
      if (!audio) {
        audio = new Audio(MUSIC_LOCAL);
        audio.loop = true;
        audio.volume = 0.35;
        audio.onerror = () => {
          // local file missing — fall back to the streamed preview
          if (audio.src.includes('music.mp3')) {
            audio.src = MUSIC_PREVIEW;
            audio.play().catch(() => {});
          }
        };
        audioRef.current = audio;
      }
      audio.play().catch(() => {});
      setSound(true);
    } else {
      audioRef.current?.pause?.();
      setSound(false);
    }
  };

  // stop the music if the chrome unmounts (page navigation)
  useEffect(() => () => { audioRef.current?.pause?.(); }, []);

  return (
    <>
      <a className="logo" href="/" aria-label="Home">
        rn<sup>•</sup>
      </a>

      <span className="interact-label">INTERACT</span>

      <button className="toggle-btn theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <nav className="vnav">
        {NAV.map((n) => (
          <a key={n.href} href={n.href} className={active === n.spy ? 'active' : ''}>
            {n.label}
          </a>
        ))}
      </nav>

      <div className="socials">
        <a href={profile.github.href} target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.9 10.9c.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17 4.6 18 4.9 18 4.9c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5z" /></svg>
        </a>
        {!profile.linkedin.placeholder && (
          <a href={profile.linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 5.9V21h-4v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" /></svg>
          </a>
        )}
      </div>

      <button className="toggle-btn sound-toggle" onClick={toggleSound} aria-label="Toggle music">
        {sound ? <SoundOnIcon /> : <SoundOffIcon />}
      </button>

      <a className="scroll-cue" href="/#about" aria-label="Scroll down">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
      </a>
    </>
  );
}
