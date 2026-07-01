import Chrome from '@/components/Chrome';
import Background from '@/components/Background';
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

        <div className="diary-list">
          {diary.map((d, i) => (
            <article className="diary-card" key={i}>
              <span className="diary-card-date">{d.date}</span>
              <h3 className="diary-card-title">{d.title}</h3>
              <p className="diary-card-body">{d.body}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
