import Chrome from '@/components/Chrome';
import Background from '@/components/Background';
import Hero from '@/components/Hero';
import About from '@/components/About';
import FeaturedProjects from '@/components/FeaturedProjects';
import Work from '@/components/Work';
import SiteFooter from '@/components/SiteFooter';

export default function Home() {
  return (
    <>
      <Background />
      <Chrome />
      <main className="shell">
        <Hero />
        <About />
        <FeaturedProjects />
        <Work />
      </main>
      <SiteFooter />
    </>
  );
}
