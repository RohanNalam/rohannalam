import { experiences } from '@/data/about';
import BrandLogo from './BrandLogo';
import Reveal from './Reveal';

export default function Work() {
  return (
    <section className="section" id="work">
      <Reveal as="p" className="eyebrow">INTERNSHIP &amp; EXPERIENCE</Reveal>
      <h2 className="big-head">Experience</h2>

      <div className="exp-list">
        {experiences.map((e, i) => (
          <Reveal className={`exp-row ${e.placeholder ? 'placeholder' : ''}`} key={i} delay={Math.min(i + 1, 5)} from={i % 2 ? 'right' : 'left'}>
            <BrandLogo
              src={e.logo}
              alt={e.org}
              className="brand-logo exp-logo"
              fallback={<span className="exp-badge">{e.badge}</span>}
            />
            <div className="exp-text">
              <div className="exp-head">
                <span className="exp-org">{e.org}</span>
                {e.present && <span className="exp-present">Present</span>}
                {e.date && <span className="exp-date">{e.date}</span>}
              </div>
              <div className="exp-role">{e.role}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
