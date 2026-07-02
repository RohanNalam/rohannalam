import Chrome from '@/components/Chrome';
import Background from '@/components/Background';
import DiaryView from '@/components/DiaryView';
import { diary } from '@/data/misc';

export const metadata = { title: 'Diary — Rohan Nalam' };

export default function DiaryPage() {
  return (
    <>
      <Background />
      <Chrome />
      <main className="shell page">
        <p className="eyebrow">NOTES & BUILD LOGS</p>
        <h1 className="big-head">Diary.</h1>
        <p className="section-sub">Short notes on what I&apos;m building, learning, and breaking.</p>

        {diary.length > 0 ? (
          <DiaryView />
        ) : (
          <p className="section-sub">More soon — check back for build logs and notes.</p>
        )}
      </main>
    </>
  );
}
