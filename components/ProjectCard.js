'use client';

import dynamic from 'next/dynamic';

const ProjectCanvas = dynamic(() => import('./three/ProjectCanvas'), {
  ssr: false,
  loading: () => <div className="project-canvas" />,
});

export default function ProjectCard({ project }) {
  const {
    title, kind, year, role, blurb, bullets, tags,
    live, github, video, award, placeholder, object, glow,
  } = project;

  return (
    <article className="project" id={project.id}>
      <div className="project-main">
        <div className="project-top">
          <h3 className="project-title">{title}</h3>
          {year && <span className="project-year">{year}</span>}
        </div>
        {kind && <p className="project-kind">{kind}{role ? ` · ${role}` : ''}</p>}
        {award && <p className="project-kind" style={{ color: '#b06bf0' }}>★ {award}</p>}

        {placeholder ? (
          <p className="placeholder-note">
            Tell me what {title} is (1–3 lines) + live / GitHub / video links and I’ll fill this in.
          </p>
        ) : (
          <>
            {blurb && <p className="project-blurb">{blurb}</p>}
            {bullets?.length > 0 && (
              <ul className="project-bullets">
                {bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            )}
          </>
        )}

        {video && (
          <div className="video-embed">
            <iframe src={video} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title={`${title} demo`} />
          </div>
        )}

        <div className="project-links">
          {live ? <a href={live} target="_blank" rel="noreferrer">Live ↗</a> : (!placeholder && <span className="disabled">Live —</span>)}
          {github ? <a href={github} target="_blank" rel="noreferrer">GitHub ↗</a> : (!placeholder && <span className="disabled">GitHub —</span>)}
        </div>

        {tags?.length > 0 && (
          <div className="project-tags">
            {tags.map((t) => <span key={t}>#{t}</span>)}
          </div>
        )}
      </div>

      <div className="canvas-wrap">
        <div
          className="canvas-glow"
          style={{ background: `radial-gradient(circle, ${glow || 'rgba(176,107,240,0.45)'} 0%, transparent 70%)` }}
        />
        <ProjectCanvas object={object} />
      </div>
    </article>
  );
}
