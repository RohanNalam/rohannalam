'use client';

import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { projects } from '@/data/projects';
import Reveal from './Reveal';

const ProjectCanvas = dynamic(() => import('./three/ProjectCanvas'), {
  ssr: false,
  loading: () => <div className="project-canvas" />,
});

// Lightweight icon per object so the grid stays GPU-cheap (one WebGL canvas
// is reserved for the detail modal). The real 3D model shows on open.
const ICON = {
  computer: '🖥️', floppy: '💾', tv: '📺', coin: '🪙', gem: '💎',
  rocket: '🚀', robot: '🤖', controller: '🎮', knot: '🌀',
};

export default function ProjectsView() {
  const params = useSearchParams();
  const [open, setOpen] = useState(null);

  useEffect(() => {
    const id = params.get('open');
    if (id) setOpen(projects.find((p) => p.id === id) || null);
  }, [params]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <p className="eyebrow">MY WORK</p>
      <h1 className="big-head">All Projects.</h1>
      <p className="section-sub">{projects.length} things I&apos;ve designed, built, or researched. Click any to dive in.</p>

      <div className="proj-grid">
        {projects.map((p, i) => (
          <Reveal as="button" className="proj-tile" key={p.id} onClick={() => setOpen(p)} delay={Math.min((i % 4) + 1, 5)}>
            <div className="proj-tile-art" style={{ background: `radial-gradient(120% 120% at 30% 20%, ${p.glow} 0%, transparent 72%)` }}>
              <span className="tile-icon">{ICON[p.object] || '✦'}</span>
              {p.placeholder && <span className="tile-flag">draft</span>}
            </div>
            <div className="proj-tile-meta">
              <span className="proj-tile-name">{p.title}</span>
              <span className="proj-tile-kind">{p.kind || 'Coming soon'}</span>
            </div>
          </Reveal>
        ))}
      </div>

      {open && <Detail project={open} onClose={() => setOpen(null)} />}
    </>
  );
}

function Detail({ project, onClose }) {
  const { title, kind, year, role, blurb, bullets, tags, live, github, video, award, placeholder } = project;
  return (
    <div className="modal-scrim" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>

        <div className="modal-hero" style={{ background: `radial-gradient(100% 140% at 70% 10%, ${project.glow} 0%, transparent 70%)` }}>
          <div className="modal-hero-canvas"><ProjectCanvas object={project.object} /></div>
          <div className="modal-hero-text">
            {year && <span className="modal-year">{year}</span>}
            <h2 className="modal-title">{title}</h2>
            <span className="modal-role">{role || 'Project'}</span>
          </div>
        </div>

        <div className="modal-body">
          {kind && <p className="modal-kind">{kind}</p>}
          {award && <p className="modal-award">★ {award}</p>}

          {placeholder ? (
            <p className="placeholder-note">Tell me what {title} is (1–3 lines) + live / GitHub / video links and I’ll fill this in.</p>
          ) : (
            <>
              <h3 className="modal-h">Overview</h3>
              <p className="modal-p">{blurb}</p>
              {bullets?.length > 0 && (
                <>
                  <h3 className="modal-h">Highlights</h3>
                  <ul className="project-bullets">{bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
                </>
              )}
            </>
          )}

          {video && (
            <div className="video-embed" style={{ marginTop: 22 }}>
              <iframe src={video} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={`${title} demo`} />
            </div>
          )}

          <div className="project-links" style={{ marginTop: 22 }}>
            {live ? <a href={live} target="_blank" rel="noreferrer">Live ↗</a> : (!placeholder && <span className="disabled">Live —</span>)}
            {github ? <a href={github} target="_blank" rel="noreferrer">GitHub ↗</a> : (!placeholder && <span className="disabled">GitHub —</span>)}
          </div>

          {tags?.length > 0 && (
            <div className="project-tags" style={{ marginTop: 16 }}>
              {tags.map((t) => <span key={t}>#{t}</span>)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
