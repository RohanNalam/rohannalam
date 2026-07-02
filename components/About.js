'use client';

import { useState } from 'react';
import { profile } from '@/data/profile';
import { greeting, education, awardsActivities, techStack } from '@/data/about';
import BrandLogo from './BrandLogo';
import Reveal from './Reveal';
import SplitText from './SplitText';

export default function About() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  };

  return (
    <section className="section about" id="about">
      <Reveal as="p" className="eyebrow">{greeting}</Reveal>
      <h2 className="big-head"><SplitText>About</SplitText></h2>

      <div className="about-grid">
        {/* left column */}
        <div className="about-col">
          <Reveal className="card photo-card" delay={1} from="left">
            <div className="photo-frame">
              {/* drop the file at public/rohan-canyon.jpg — if missing,
                  the placeholder gradient below shows instead. */}
              <img
                src="/rohan-canyon.png"
                alt=""
                className="photo-img"
                ref={(el) => {
                  if (el && el.complete && el.naturalWidth > 0) el.classList.add('loaded');
                }}
                onLoad={(e) => { e.currentTarget.classList.add('loaded'); }}
              />
              <div className="photo-placeholder" aria-hidden="true">
                <span>📸</span>
                <span className="photo-placeholder-text">
                  Drop your photo at <code>public/rohan-canyon.jpg</code>
                </span>
              </div>
            </div>
            <p className="photo-blurb">
              I really love computer science. There&apos;s just something about
              taking an idea and turning it into something that actually works.
              Lately I&apos;ve been most into building developer tools, since I
              like making stuff that makes other people&apos;s work easier. I&apos;m
              also a big math person, and honestly a lot of the same problem
              solving shows up in everything I build.
            </p>
          </Reveal>

          <Reveal className="card" delay={2} from="left">
            <div className="card-label">🎓 Education</div>
            {education.map((e) => (
              <div className="edu-row" key={e.org}>
                <BrandLogo
                  src={e.logo}
                  alt={e.org}
                  className="brand-logo edu-logo"
                  fallback={<span className="edu-badge">{e.badge}</span>}
                />
                <div>
                  <div className="edu-title">{e.title}</div>
                  <div className="edu-org">{e.org}</div>
                  <div className="edu-detail">{e.detail}</div>
                </div>
              </div>
            ))}
          </Reveal>

          <Reveal className="card" delay={3} from="left">
            <div className="card-label">🏆 Awards &amp; Activities</div>
            <ul className="aa-list">
              {awardsActivities.map((a) => (
                <li key={a.text}>
                  <BrandLogo
                    src={a.logo}
                    alt=""
                    className="brand-logo aa-logo"
                    fallback={<span className="aa-badge">{a.badge}</span>}
                  />
                  <span>{a.text}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={4}>
            <button className="card card-btn" onClick={copyEmail}>
              <span className="card-label" style={{ margin: 0 }}>
                ✉️ {copied ? 'Copied!' : 'Say Hi — Copy email'}
              </span>
            </button>
          </Reveal>
        </div>

        {/* right column — tech stack */}
        <Reveal className="card tech-card" delay={2} from="right">
          <div className="tech-title">Tech Stack</div>
          {techStack.map((g) => (
            <div key={g.group} className="tech-group">
              <div className="tech-group-name">{g.group}</div>
              <div className="tech-pills">
                {g.items.map((it) => (
                  <span className="tech-pill" key={it.n}>
                    <BrandLogo
                      src={it.i}
                      alt=""
                      className="tech-logo"
                      fallback={<span className="tech-dot" style={{ background: g.color }} />}
                    />
                    {it.n}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
