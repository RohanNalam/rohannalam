import Link from 'next/link';
import { projects } from '@/data/projects';
import Reveal from './Reveal';
import SplitText from './SplitText';

// Featured = the projects with real content (skip placeholders).
const featured = projects.filter((p) => !p.placeholder);

function Card({ p }) {
  return (
    <Link href={`/projects?open=${p.id}`} className="feat-card">
      <div className="feat-art" style={{ background: `radial-gradient(120% 120% at 30% 20%, ${p.glow} 0%, transparent 70%)` }}>
        <span className="feat-tag">{p.kind?.split('·')[0]?.trim() || 'Project'}</span>
      </div>
      <div className="feat-meta">
        <span className="feat-name">{p.title}</span>
        <span className="feat-year">{p.year}</span>
      </div>
    </Link>
  );
}

export default function FeaturedProjects() {
  const loop = [...featured, ...featured];
  return (
    <section className="section" id="projects">
      <Reveal as="p" className="eyebrow">MY WORK</Reveal>
      <h2 className="big-head big-head-split"><SplitText>Featured Projects.</SplitText></h2>
      <Reveal as="p" className="section-sub" delay={2}>Explore some of the things I&apos;ve built — drag, scroll, or browse them all.</Reveal>

      <Reveal className="marquee" delay={3} from="zoom">
        <div className="marquee-track">
          {loop.map((p, i) => <Card key={`${p.id}-${i}`} p={p} />)}
        </div>
      </Reveal>

      <Reveal className="browse-wrap" delay={4}>
        <Link href="/projects" className="browse-btn">Browse All Projects</Link>
      </Reveal>
    </section>
  );
}
