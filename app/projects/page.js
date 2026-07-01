import { Suspense } from 'react';
import Chrome from '@/components/Chrome';
import Background from '@/components/Background';
import ProjectsView from '@/components/ProjectsView';

export const metadata = { title: 'Projects — Rohan Nalam' };

export default function ProjectsPage() {
  return (
    <>
      <Background />
      <Chrome />
      <main className="shell page">
        <Suspense fallback={<p className="section-sub">Loading…</p>}>
          <ProjectsView />
        </Suspense>
      </main>
    </>
  );
}
